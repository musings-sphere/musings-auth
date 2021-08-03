export interface AccessDecisionManagerInterface {
	decide(token: string, attributes: any[], object: any): Promise<boolean>;
}
