import { Module } from "@nestjs/common";
import { AppLogger } from "./app";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./app/database/database.module";
import { HealthCheckModule } from "./app/healthcheck/healthcheck.module";
import { SecurityModule } from "./app/security";
import { AuthModule } from "./app/auth/auth.module";
import { UserModule } from "./app/user/user.module";

@Module({
	imports: [
		HealthCheckModule,
		DatabaseModule,
		SecurityModule,
		AuthModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	private logger = new AppLogger(AppModule.name);

	constructor() {
		this.logger.log("Initialize constructor");
	}
}
