import { outputAst } from '@angular/compiler';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit{
  @Input() rangeValue?: number = 0;
  @Input() rangeLabel?: string;
  @Input() rangeID?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() isDisabled?: boolean = false;
  @Output() onRangeEvent = new EventEmitter<any>;

  ngOnInit(): void {
    
  }

  onRangeChange(e:any){
    this.onRangeEvent.emit(e.target.value);
  }
}
