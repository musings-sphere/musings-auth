import { createParamDecorator } from "@nestjs/common";

export const Profile = createParamDecorator((_data, req) => {
	return req.user;
});
