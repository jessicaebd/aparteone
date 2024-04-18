import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mailbox-list',
  templateUrl: './mailbox-list.component.html',
  styleUrls: ['./mailbox-list.component.css']
})
export class MailboxListComponent {
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
  @Output() onSubmitEvent = new EventEmitter<number>;

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex);
  }
}
