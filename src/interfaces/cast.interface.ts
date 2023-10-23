import { IMovie } from './movie.interface';

export interface ICast {
  id: string;
  name: string;
  role: string;
  movieId: string;
  movie: IMovie;
}
