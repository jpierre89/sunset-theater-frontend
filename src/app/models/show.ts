import {Movie} from './movie';

/** a show for a selected date without reservation data returned from theater api */
export class Show {
  // tslint:disable-next-line:variable-name
  auditorium_id: number;
  id: number;
  date: string;
  time: string;
  movie: Movie;

}

