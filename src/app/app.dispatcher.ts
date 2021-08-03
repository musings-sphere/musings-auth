import {
	INestApplication,
	INestApplicationContext,
	INestMicroservice,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import { AppModule } from "../app.module";
import { config } from "../config";
import { HttpExceptionFilter, TwingExceptionFilter } from "./_helpers";
import { AppLogger } from "./app.logger";

export class AppDispatcher {
	private app: INestApplication;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	private microservice: INestMicroservice;
	private logger = new AppLogger(AppDispatcher.name);

	async dispatch(): Promise<void> {
		await this.createServer();
		this.createMicroservices();
		await this.startMicroservices();
		return this.startServer();
	}

	async shutdown(): Promise<void> {
		await this.app.close();
	}

	public getContext(): Promise<INestApplicationContext> {
		return NestFactory.createApplicationContext(AppModule);
	}

	private async createServer(): Promise<void> {
		this.app = await NestFactory.create(AppModule, {
			logger: new AppLogger("Nest"),
		});
		useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
		this.app.use(cors());
		this.app.useGlobalFilters(new HttpExceptionFilter());
		this.app.useGlobalFilters(new TwingExceptionFilter());
		this.app.use(compression());
		if (config.isProduction) {
			this.app.use(helmet());
		}
		const options = new DocumentBuilder()
			.setTitle(config.name)
			.setDescription(config.description)
			.setVersion(config.version)
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(this.app, options);
		SwaggerModule.setup("/docs", this.app, document);
	}

	private createMicroservices(): void {
		this.microservice = this.app.connectMicroservice(config.microservice);
	}

	private startMicroservices(): Promise<INestApplication> {
		return this.app.startAllMicroservicesAsync();
	}

	private async startServer(): Promise<void> {
		await this.app.listen(config.port, config.host);
		this.logger.log(
			`😎 Swagger is exposed at https://${config.host}:${config.port}/docs 😎`
		);
		this.logger.log(
			`😎 Server is listening https://${config.host}:${config.port} 😎`
		);
	}
}
