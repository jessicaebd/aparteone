import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent {
  @Input() listRequest!: any;
  @Input() errorMsg!: string;
  @Input() pagination: boolean = true;

  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() showPageSizeOptions?: boolean = true;
  @Input() pageSizeOptions?: any = [5, 10, 25];
  @Input() disabled?: any = false;
  @Input() hidePageSize?: boolean = true;
  @Output() onPageIndexEvent = new EventEmitter<number>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.listRequest.paginator = this.paginator;
  }

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex * this.pageSize);
  }
}
