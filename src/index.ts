import "dotenv/config";
import "reflect-metadata";

import exitHook from "exit-hook";
import { AppLogger, AppDispatcher } from "./app";

const logger = new AppLogger("Index");
logger.log(`Start`);
const dispatcher = new AppDispatcher();

dispatcher
	.dispatch()
	.then(() => logger.log("Everything up running"))
	.catch((e) => {
		logger.error(e.message, e.stack);
		process.exit(1);
	});

exitHook(() => {
	dispatcher.shutdown().then(() => {
		logger.log("Gracefully shutting down the server");
	});
});
