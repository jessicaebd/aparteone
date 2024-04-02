import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit{
  @Input() buttonLabel?: string;
  @Input() link?: string;
  @Input() buttonClass : "primary" | "secondary" | "accent" | "danger" | "success" | "white" | "outline-primary" | "outline-secondary" | "outline-accent" | "outline-danger" | "outline-white" | "outline-success" = "primary";
  @Input() isDisabled : boolean = false;
  @Output() onClickEvent = new EventEmitter<any>();

  constructor() {
    
  }

  ngOnInit(): void {
    // if(this.isDisable){
    //   disabled = 
    // }
  }

  onClickButton(): void {
    this.onClickEvent.emit();
  }
}
