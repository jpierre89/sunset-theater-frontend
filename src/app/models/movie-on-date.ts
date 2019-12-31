import {Genre} from './genre';
import {Director} from './director';
import {Actor} from './actor';

export class MovieOnDate {
  id: number;
  title: string;
  runtime: string;
  description: string;
  genre: Genre;
  director: Director;
  cast: Actor[];
  rating: string;
}
