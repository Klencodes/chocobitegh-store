import { Directive, ElementRef, HostListener, Input, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment'
@Directive({
  selector: '[dateFormat]'
})
export class DateDirective {

  @Input('form') accountform : FormGroup
  @Input('controlName') controlName : string;
  constructor(private e: ElementRef) { }

  @HostListener('ngModelChange', ['$event']) dateChange(value) {
    console.log('blur')
    const year = value.year;
    const date = value.day;
    const month = value.month;
    let newDate = new Date(year, month -1, date);
    let fdate = moment(newDate).format('YYYY-MM-DD');
    this.accountform.get(this.controlName).setValue(fdate)
  }

}