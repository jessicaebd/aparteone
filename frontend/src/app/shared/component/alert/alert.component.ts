import { Component, Input, Output, TemplateRef, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent{
  @Input() alertClass?: "primary" | "success" | "danger" | "warning" | "info" = "primary"
  @Input() showAlert?: boolean = false;
  @Input() alertContent!: TemplateRef<any>;
  // @Output() onCloseEvent = new EventEmitter<any>;

  onCloseAlert(){
    this.showAlert = false;
    // this.onCloseEvent.emit(false);
  }

  // ngOnChanges(){
  //   // if(this.showAlert){
  //   //   this.delay(5000);
  //   // }
  // }

  // async delay(ms: number) {
  //   await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("delay"));
  //   this.showAlert = false;
  //   this.onCloseEvent.emit(false);
  // }
}
