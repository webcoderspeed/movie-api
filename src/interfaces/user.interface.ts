import { IMovie } from './movie.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  movies?: IMovie[];
}
