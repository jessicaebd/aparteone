import { ErrorMessage } from './../../models/general.model';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

export interface Column{
  name: string;
  displayName: string;
  align?: "left" | "center" | "right";
}

export interface Toolbar{
  label: string;
  icon: string;
  disable: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit{
  @Input() dataTable?: any;
  @Input() columns: Column[] = [];
  @Input() headerAlignment: "left" | "center" | "right" = "left";
  @Input() buttonFlag: boolean = false;
  @Input() errorMsg?: string;
  
  @Input() tableToolbar: boolean = false;
  @Input() toolbar: Toolbar[] = [];

  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() showPageSizeOptions?: boolean = true;
  @Input() pageSizeOptions?: any = [5, 10, 25];
  @Input() disabled?: any = false;
  @Input() hidePageSize?: boolean = true;

  @Input() label?: string;
  @Input() type: "primary" | "secondary" | "accent" | "danger" | "white" = "primary";
  @Input() iconStart?: string;
  @Input() iconEnd?: string;
  @Input() size?: "small" | "large";
  @Input() isDisabled: boolean = false;
  @Input() actionTarget?: string;
  @Input() actionToggle?: string;
  @Output() onClickActionEvent = new EventEmitter<any>;
  @Output() onPageIndexEvent = new EventEmitter<number>;
  @Output() onClickEvent = new EventEmitter<any>;
  @Output() onDoubleClickEvent = new EventEmitter<any>;
  
  onClickActionElement: any;
  displayedColumns: string[] = [];
  clickedRows!: [any];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.displayedColumns = this.columns.map((col) => col.name);
  }

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
  }

  OnClickActionButton(e:any){
    this.onClickActionEvent.emit(e);
  }

  onClickPageIndex(e:any){
    // console.log("Index :", e.pageIndex);
    // console.log("Skip :", e.pageIndex * this.pageSize);
    this.onPageIndexEvent.emit(e.pageIndex * this.pageSize);
  }

  onRowClicked(e:any){
    this.onClickEvent.emit(e);
    this.clickedRows = e;
  }
  
  onRowDoubleClicked(e:any){
    this.onDoubleClickEvent.emit(e);
  }

  onClickToolbar(e:any){
    console.log(e);
  }
}
