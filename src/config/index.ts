import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { readFileSync } from "fs";
import { ConnectionOptions } from "typeorm";

const appPackage = readFileSync(`${__dirname}/../../package.json`, {
	encoding: "utf8",
});
const appData = JSON.parse(appPackage);

interface Config {
	port: number;
	host: string;
	uuid: string;
	logger: {
		level: string;
		transports?: any[];
	};
	isProduction: boolean;
	database: ConnectionOptions;
	version: string;
	name: string;
	description: string;
	validator: {
		validationError: {
			target: boolean;
			value: boolean;
		};
	};
	session: {
		domain: string;
		secret: string;
		timeout: number;
		refresh: {
			secret: string;
			timeout: number;
		};
		verify_account: {
			secret: string;
			timeout: number;
		};
		password_reset: {
			secret: string;
			timeout: number;
		};
		verify: {
			secret: string;
			timeout: number;
		};
	};
	facebook: {
		app_id: string;
		app_secret: string;
	};
	microservice: MicroserviceOptions;
	google: {
		clientID: string;
		clientSecret: string;
		callbackUrl: string;
		refreshToken: string;
		accessToken: string;
		mailClientId: string;
		mailClientSecret: string;
		mailRefreshToken: string;
	};
	mail: {
		from: string;
	};
	assetsPath: string;
	clientUrl: string;
	serverUrl: string;
	redisURL: string;
}

export const config: Config = {
	port: parseInt(process.env.PORT as string, 10),
	host: process.env.APP_HOST as string,
	uuid: process.env.UUID as string,
	logger: {
		level: process.env.LOG_LEVEL as string,
	},
	isProduction: process.env.NODE_ENV === "production",
	database: {
		type: "mongodb",
		url: process.env.MONGODB_URI,
		synchronize: false,
		logging: "all",
		logger: "file",
		useNewUrlParser: true,
		useUnifiedTopology: true,
		migrationsRun: true,
		migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
		entities: [`${__dirname}/../**/entity/*.entity{.ts,.js}`],
	},
	version: appData.version,
	name: "Mobilities",
	description: appData.description,
	validator: {
		validationError: {
			target: false,
			value: false,
		},
	},
	session: {
		domain: process.env.SESSION_DOMAIN as string,
		secret: process.env.SESSION_SECRET as string,
		timeout: parseInt(process.env.SESSION_TIMEOUT as string, 10),
		refresh: {
			secret: process.env.SESSION_REFRESH_SECRET as string,
			timeout: parseInt(process.env.SESSION_REFRESH_TIMEOUT as string, 10),
		},
		verify_account: {
			secret: process.env.SESSION_VERIFY_ACCOUNT as string,
			timeout: parseInt(
				process.env.SESSION_VERIFY_ACCOUNT_TIMEOUT as string,
				10
			),
		},
		password_reset: {
			secret: process.env.SESSION_PASSWORD_RESET_SECRET as string,
			timeout: parseInt(
				process.env.SESSION_PASSWORD_RESET_TIMEOUT as string,
				10
			),
		},
		verify: {
			secret: process.env.SESSION_VERIFY_SECRET as string,
			timeout: parseInt(process.env.SESSION_VERIFY_TIMEOUT as string, 10),
		},
	},
	facebook: {
		app_id: process.env.APP_FACEBOOK_APP_ID,
		app_secret: process.env.APP_FACEBOOK_APP_SECRET,
	},
	microservice: {
		transport: Transport.TCP,
	},
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID as string,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
		accessToken: process.env.GOOGLE_ACCESS_TOKEN as string,
		mailClientId: process.env.GOOGLE_MAIL_CLIENT_ID as string,
		mailClientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET as string,
		mailRefreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN as string,
	},
	mail: {
		from: process.env.MAIL_FROM as string,
	},
	assetsPath: `${__dirname}/../assets`,
	redisURL: process.env.REDIS_URL as string,
	clientUrl:
		process.env.NODE_ENV === "development"
			? (process.env.DEVELOPMENT_SITE_URL as string)
			: (process.env.PRODUCTION_SITE_URL as string),
	serverUrl:
		process.env.NODE_ENV === "development"
			? (process.env.DEVELOPMENT_SERVER_URL as string)
			: (process.env.PRODUCTION_SERVER_URL as string),
};
