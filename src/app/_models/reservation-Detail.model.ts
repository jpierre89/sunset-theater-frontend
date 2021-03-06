/** api model */
import {SeatModel} from './seat.model';
import {ShowModel} from './show.model';
import {AuditoriumModel} from './auditorium.model';

export class ReservationDetailModel {
  id: number;
  seat: SeatModel;
  show: ShowModel;
  auditorium: AuditoriumModel;
}
