import { IUserDocument } from '../../types/user.types';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
      accessToken: string;
    }
  }
}
