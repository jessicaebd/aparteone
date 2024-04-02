import { Component, Input, OnInit } from '@angular/core';

export interface Breadcrumbs{
  name: string,
  path?: string
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit{
  @Input() listItems?: Breadcrumbs[] = [];

  ngOnInit():void {
    
  }
}
