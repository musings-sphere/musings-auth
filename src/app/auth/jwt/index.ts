import { Secret, sign, verify } from "jsonwebtoken";
import { config } from "../../../config";
import { DeepPartial } from "../../_helpers/database";
import { UserEntity } from "../../user/entity";
import { TokenDto } from "../dto/token.dto";

export async function createAuthToken({ id }: DeepPartial<UserEntity>) {
	const expiresIn = config.session.timeout;
	const accessToken = createToken(id, expiresIn, config.session.secret);
	const refreshToken = createToken(
		id,
		config.session.refresh.timeout,
		config.session.refresh.secret
	);
	return {
		expiresIn,
		accessToken,
		refreshToken,
	};
}

export function createToken(
	id: string | undefined,
	expiresIn: number,
	secret: Secret
) {
	return sign({ id }, secret, {
		expiresIn,
		audience: config.session.domain,
		issuer: config.uuid,
	});
}

export async function verifyToken(
	token: string,
	secret: string
): Promise<TokenDto> {
	return new Promise((resolve, reject) => {
		verify(token, secret, (err, decoded) => {
			if (err) {
				return reject(err);
			}
			resolve(decoded as TokenDto);
		});
	});
}
