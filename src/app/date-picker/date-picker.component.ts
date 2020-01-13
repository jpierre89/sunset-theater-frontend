import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {BsDatepickerConfig} from 'ngx-bootstrap';

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
  /* datepicker config */
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  /* minimum date selection by user is set to current date */
  minDate: Date;
  /* date of datepicker. Defaults to minDate */
  selectedDate: Date;
  /* date change event transmitter for parent component */
  @Output() dateEmitter = new EventEmitter<Date>();


  /* fires when user selects or enters a date on datepicker */
  public changeDate(event: Date) {
    this.selectedDate = event;
    this.dateEmitter.emit(this.selectedDate);
  }

constructor() {
  this.minDate = new Date();
  this.selectedDate = this.minDate;
}

ngOnInit() {
    this.dpConfig.containerClass = 'theme-orange';
    this.dpConfig.dateInputFormat = 'MM/DD/YYYY';
    this.dpConfig.isAnimated = true;
    this.dpConfig.showWeekNumbers = false;

    this.changeDate(this.selectedDate);
  }
}
