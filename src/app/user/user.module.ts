import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OnlineService } from "./online.service";
import { UserSubscriptionService } from "./user-subscription.service";
import { UserCommand } from "./user.command";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { IsUserAlreadyExist } from "./user.validator";

const PROVIDERS = [
	...userProviders,
	IsUserAlreadyExist,
	UserService,
	OnlineService,
	UserSubscriptionService,
	UserCommand,
];

@Module({
	controllers: [UserController],
	providers: [...PROVIDERS],
	imports: [DatabaseModule],
	exports: [UserService, OnlineService],
})
export class UserModule {}
