import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styleUrls: ['./dynamic-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicTextareaComponent),
      multi: true,
    },
  ],
})
export class DynamicTextareaComponent implements ControlValueAccessor {
  @Input() value?: string;
  onTouched: any = () => {};
  @Input() inputPlaceholder: string | undefined;
  @Input() isInvalid: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() maxLength: number = 99999999;
  @Input() inputControl: string | undefined;
  @Input() inputID: string | undefined;
  @Input() inputLabel: string | undefined;
  @Input() rows: number = 2;
  @Input() cols: number = 20;

  @Output() onChangeEvent = new EventEmitter<string>();

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

