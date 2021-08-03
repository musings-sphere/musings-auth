import { Injectable } from "@nestjs/common";
import { RequestContext } from "../../_helpers";
import {
	AccessDecisionManager,
	AccessDecisionStrategyEnum,
} from "../access-decision";
import { RestVoterActionEnum, VoterRegistry } from "../voter";
import { AuthorizationCheckerInterface } from "./authorization-checker.interface";

@Injectable()
export class AuthorizationChecker implements AuthorizationCheckerInterface {
	private readonly adm: AccessDecisionManager;
	private readonly tokenStorage: any;

	constructor(voterRegistry: VoterRegistry) {
		this.adm = new AccessDecisionManager(
			voterRegistry.getVoters(),
			AccessDecisionStrategyEnum.STRATEGY_AFFIRMATIVE,
			true
		);
		this.tokenStorage = function () {
			return {
				getUser: () => RequestContext.currentUser(),
			};
		};
	}

	public async isGranted(
		attributes: string[] | RestVoterActionEnum,
		subject: null
	) {
		const token = this.tokenStorage();

		if (!Array.isArray(attributes)) {
			// tslint:disable-next-line:no-parameter-reassignment
			attributes = [attributes];
		}

		return this.adm.decide(token, attributes, subject);
	}
}
