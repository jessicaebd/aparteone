import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css']
})
export class TextButtonComponent {
  @Input() label?: string;
  @Input() link?: string;
  @Input() type: "primary" | "secondary" | "accent" | "danger" | "white" = "primary";
  @Input() iconStart?: string;
  @Input() iconEnd?: string;
  @Input() size?: "small" | "large";
  @Input() weight?: "bold" | "bolder";
  @Input() isDisabled: boolean = false;
  @Output() onClickEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClickButton(): void {
    this.onClickEvent.emit();
  }
}
