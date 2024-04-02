import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../table/table.component';

export interface object1 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent{
  @Input() width?: number;
  @Input() label?: string;
  @Input() picker: string  = "";
  @Input() pickColumn!: string;
  @Input() data!: any;
  @Input() col!: Column[];

  tempPicker: string = "";

  onChangePickerValue(value:any): void {
    this.tempPicker = value;
  }
  
  onPickerChange(e:any): void{
    this.picker = e.target.value;
  }

  OnListItemClick(e:any){
    this.tempPicker = this.tempPicker.concat(e[this.pickColumn].toString(), ';');
  }

  submitPicker(){
    this.picker = this.picker.concat(this.tempPicker.toString());
    this.tempPicker = "";
  }
}
