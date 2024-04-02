import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CheckboxListItems {
  name? : string;
  checked? : boolean;
  color? : string;
}

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckboxListComponent implements OnInit{
  @Input() listItems: any;
  @Input() checkID: string | undefined;
  @Input() horizontal?: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly?: boolean = false;
  // @Input() checkFor: string | undefined;
  // @Input() labelCheckbox?: string;
  // @Input() labelPosition? : 'before' | 'after' = 'after';
  // @Input() color? : string;
  // @Input() isRequired? : boolean;
  // @Input() isDisabled? : boolean;
  @Output() onChangeEvent = new EventEmitter<any>();

  constructor(){  }

  onChangeChecked(): void {
    // console.log(this.listItems);
    var result = new Array();
    for(let i=0; i<this.listItems.length; i++){
      if(this.listItems[i].checked){
        // console.log(this.listItems[i].name);
        result.push(this.listItems[i].name);
      }
    }
    // console.log(result);
    this.onChangeEvent.emit(result);
    // (<HTMLInputElement>document.getElementById("tsInput-" + this.checkID)).value = result.join(';')
  }

  ngOnInit() {
    
  }
}

