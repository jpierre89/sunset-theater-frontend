import { Pipe, PipeTransform } from '@angular/core';

/*
 * pipes 24-hr time string to 12-hr time string
 * 'hh:mm:ss' -> 'hh:mm am' or 'hh:mm pm'
 * truncates seconds
 */
@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length !== 8) {
      return value;
    }

    // unary operator!
    let hours: number = +(value.slice(0, 2));
    const min: string = value.slice(3, 5);

    if ( hours < 0 || hours > 24 || +min < 0 || +min > 60) {
      return value;
    }

    let meridian = 'am';
    if (hours >= 12 ) {
      meridian = 'pm';
    }

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return hours.toString() + ':' + min.toString() + ' ' + meridian;
  }
}
