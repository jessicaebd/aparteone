import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  @Input() counter: number = 1;
  @Output() onCounterEvent = new EventEmitter<number>;

  onAdd(){
    this.counter++;
    this.onCounterEvent.emit(this.counter);
  }
  
  onSubtract(){
    this.counter--;
    this.onCounterEvent.emit(this.counter);
  }
}
