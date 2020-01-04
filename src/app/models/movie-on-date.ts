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
  actors: Actor[];
  rating: string;

  /* this property is not from api - rather for collapsable content */
  collapsed = true;

}
