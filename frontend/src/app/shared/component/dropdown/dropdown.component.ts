import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface listItems{
  code: string, 
  value: string
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports:[CommonModule],
})
export class DropdownComponent implements OnInit{
  @Input() selectedDropdown: string = "";
  @Input() itemDropDown: listItems[] = [];
  @Input() isDisabled?: boolean;
  @Output() isDropDownClick = new EventEmitter<any>();
  @Output() onDropdownEvent = new EventEmitter<any>();
  
  // itemDropDown : listItems[] = [];

  private example: string [] = ["Satu", "Dua", "Tiga", "Empat", "Lima"];
  
  ngOnInit(): void {
    
  }

  onDropdownChange(e:any):void {
    this.onDropdownEvent.emit(e);
  }
}
