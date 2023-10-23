import { ICast } from './cast.interface';
import { IUser } from './user.interface';

export interface IMovie {
  id: string;
  movieName: string;
  rating: number;
  genre: string;
  releaseDate: Date;
  userId: string;
  user: IUser;
  cast: ICast[];
}
