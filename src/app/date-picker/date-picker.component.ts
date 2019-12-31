import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
/** user enters a date or selects date from calendar.
 * this event is emitted to parent component for processing
 * internalizes LOCAL TIME.
 * Note: date picker month starts at 0
 */
export class DatePickerComponent implements OnInit {
  /* current date, is the minimum date displayed by datepicker */
  minDate = new Date();
  selectedDate: Date = this.minDate;
  @Output() dateEmitter = new EventEmitter<Date>();

  /* called when user selects or enters a date*/
  private changeDate(event: MatDatepickerInputEvent<any>) {
    // TODO error check event value?
    this.selectedDate = event.value; // verification test
    this.dateEmitter.emit(event.value);

  }

constructor() { }

ngOnInit() {
  }

}
