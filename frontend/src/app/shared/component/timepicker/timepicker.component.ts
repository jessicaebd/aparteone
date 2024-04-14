import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true,
    },
  ],
})
export class TimepickerComponent {
  @Input() value?: Date;
  onTouched: any = () => {};
  @Input() inputPlaceholder: string | undefined;
  @Input() isInvalid: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() maxLength: number = 99999999;
  @Input() inputControl: string | undefined;
  @Input() inputID: string | undefined;

  @Output() onChangeEvent = new EventEmitter<Date>();

  ngOnInit() {}
  onChangeValue(): void {
    this.onChangeEvent.emit(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeEvent.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
