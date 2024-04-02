import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit{
  @Input() label?: string;
  @Input() switchID?: string;
  @Input() isChecked?: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Input() isReverse?: boolean = false;
  @Output() onChangeEvent = new EventEmitter<any>;

  ngOnInit():void{

  }

  onChangeSwitch(e:any){
    if(this.isChecked){
      this.isChecked = false;
    }
    else{
      this.isChecked = true;
    }
    return this.onChangeEvent.emit(this.isChecked);
  }
}
