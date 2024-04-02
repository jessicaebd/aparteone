import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input() value?: boolean;
  @Input() checkID: string | undefined;
  @Input() labelCheckbox?: string;
  @Input() isChecked: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() onChangeEvent = new EventEmitter<string>();

  ngOnInit() {}

  onChangeChecked(): void {
    // this.onChangeEvent.emit(this.value);
  }
}
