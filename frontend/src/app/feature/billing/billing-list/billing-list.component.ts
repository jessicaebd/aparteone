import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Billing } from '../billing.interface';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent {
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

  data: Billing = {};

  @ViewChild('closeModalPay') modalClosePay: any;
  @ViewChild('closeModalHistory') modalCloseHistory: any;

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex);
  }
  
  onPayClick(response:any): Promise<any>{
    return new Promise<any> (resolve => {
      this.data['id'] = response.id;
      this.data['residentId'] = response.residentId;
      this.data['residentUnit'] = response.residentUnit;
      this.data['residentName'] = response.residentName;
      this.data['billingId'] = response.billingId;
      this.data['billingCategory'] = response.billingCategory;
      this.data['status'] = response.status;
      this.data['amount'] = response.amount;
      this.data['billingDate'] = response.billingDate;
      this.data['dueDate'] = response.dueDate;
      this.data['completedDate'] = response.completedDate;
      this.data['cancelledDate'] = response.cancelledDate;
      this.data['payment'] = response.payment;
      resolve(this.data);
    });
  }
  
  redirect(type:any){
    if(type=='pay'){
      this.modalClosePay.nativeElement.click();
    }
    else if(type=='history'){
      this.modalCloseHistory.nativeElement.click();
    }
    
    this.onSubmitEvent.emit();
  }
}
