import {MovieModel} from './movie.model';

/** api model */
export class ShowModel {
  // tslint:disable-next-line:variable-name
  auditorium: number;
  id: number;
  date: string;
  time: string;
  movie: MovieModel;
  reservations: number[];
}

