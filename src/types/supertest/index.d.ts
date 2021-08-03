import superagent from "superagent";

declare module "supertest" {
	interface Test extends superagent.SuperAgentRequest {
		authenticate(user: any): this;
	}
}
