import {GenreModel} from './genre.model';
import {DirectorModel} from './director.model';
import {ActorModel} from './actor.model';

export class MovieOnDate {
  id: number;
  title: string;
  runtime: string;
  description: string;
  genre: GenreModel;
  director: DirectorModel;
  actors: ActorModel[];
  rating: string;

  /* this property is not from api - rather for collapsable content */
  collapsed = true;
}
