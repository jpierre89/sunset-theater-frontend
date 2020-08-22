/** api model */
export class SeatModel {
  id: number;
  number: string;
  row: string;
  auditorium: number;
  //reservations: number[];
  is_empty_space: boolean;
  is_reserved: boolean;
}
