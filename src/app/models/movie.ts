/** a movie without booking details returned from theater api */
export class Movie {
  id: number;
  title: string;
  runtime: string;
  description: string;
  genre: string;
  director: string;
  cast: number[];
  rating: string;
}
