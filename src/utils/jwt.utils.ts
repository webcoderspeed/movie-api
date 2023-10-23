import jwt from 'jsonwebtoken';
import constants from '../constants';
import { IUser } from '../interfaces/user.interface';

export function signJwt(
  id: string,
  secret: string,
  options: jwt.SignOptions | undefined = {
    expiresIn: constants.authConstants.JWT_ACCESS_TOKEN_EXPIRY,
  },
) {
  return jwt.sign(
    {
      id,
    },
    secret,
    { ...(options && options) },
  );
}

export function verifyJwt(token: string, secret: string) {
  try {
    const user = jwt.verify(token, secret);

    return {
      valid: true,
      expired: false,
      user: user as IUser,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      user: null,
    };
  }
}
