import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RadioButtonItems {
  name? : string;
  checked? : boolean;
}

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RadioButtonComponent {
  @Input() listItems?: any;
  @Input() checkID: string | undefined;
  @Input() horizontal?: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() onChangeEvent = new EventEmitter<any>();

  constructor(){  }

  onChangeChecked(e:any): void {
    this.onChangeEvent.emit(e);
  }

  ngOnInit() {
    
  }
}
