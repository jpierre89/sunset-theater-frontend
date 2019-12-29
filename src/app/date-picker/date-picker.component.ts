import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';



@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
/** user enters a date or selects date from calendar.
 * this event is emitted to parent component for processing
 */
export class DatePickerComponent implements OnInit {
  selectedDate: Date; // verification test
  @Output()
  dateEmitter = new EventEmitter<Date>();

  /** called when user selects or enters a date */
  changeDate(event: MatDatepickerInputEvent<any>) {
    // TODO error check event value?
    this.selectedDate = event.value; // verification test
    this.dateEmitter.emit(event.value);
  }

constructor() { }

ngOnInit() {
  }

}
