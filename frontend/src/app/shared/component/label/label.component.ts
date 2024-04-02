import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit{
  @Input() labelFor?: string;
  @Input() labelInput?: string;
  @Input() labelType?: string;
  @Input() isMandatory?: boolean = false;

  ngOnInit() {}
}
