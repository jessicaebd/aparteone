import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { Billing } from '../billing.interface';
import { BillingService } from '../service/billing.service';

@Component({
  selector: 'app-billing-verify',
  templateUrl: './billing-verify.component.html',
  styleUrls: ['./billing-verify.component.css']
})
export class BillingVerifyComponent {
  user = this.appService.retrieveUser();

  listApproval: any;
  allDataCount: any;
  errorMsg: string = '';
  pageSize: number = 3;
  pageIndex: number = 0;
  data: Billing = {};
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private billingService: BillingService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Management'){
      await this.getBillingVerifyApartment(this.user.id, this.pageSize, this.pageIndex);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  onClickPageIndex(e:any){
    this.pageIndex = e.pageIndex;
    this.ngOnInit();
  }

  getBillingVerifyApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.getBillingVerifyApartment(apartmentId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response Verify: ', response);
          if(response.data.length > 0){
            this.listApproval = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          this.listApproval = null;
          resolve(error);
        }
      }))
  }

  setData(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.data['id'] = response.id;
      this.data['receiptId'] = response.receiptId;
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
  
  async onListItemClick(e:any){
    let data = await this.setData(e);
  }

  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }
}
