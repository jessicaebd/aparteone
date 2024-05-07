import { Component, ViewChild } from '@angular/core';
import { Merchant } from '../../merchant/merchant.interface';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { MerchantService } from '../../merchant/service/merchant.service';

@Component({
  selector: 'app-merchant-need-approval',
  templateUrl: './merchant-need-approval.component.html',
  styleUrls: ['./merchant-need-approval.component.css']
})
export class MerchantNeedApprovalComponent {
  user = this.appService.retrieveUser();

  listApproval: any;
  allDataCount: any;
  errorMsg: string = '';
  pageSize: number = 3;
  pageIndex: number = 0;
  data: Merchant = {};
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Management'){
      await this.getMerchantApartment(this.user.id, this.pageSize, this.pageIndex);
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

  getMerchantApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantApartment(apartmentId, size, page, 'Pending').subscribe({
        next: async (response: any) => {
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

  setDataMerchant(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.data['id'] = response.id;
      this.data['image'] = response.image;
      this.data['name'] = response.name;
      this.data['bankAccount'] = response.bankAccount;
      this.data['accountNumber'] = response.accountNumber;
      this.data['accountName'] = response.accountName;
      this.data['category'] = response.category;
      this.data['address'] = response.address;
      this.data['isActive'] = response.isActive;
      this.data['isApproved'] = response.isApproved;
      resolve(this.data);
    });
  }
  
  async onListItemClick(e:any){
    let data = await this.setDataMerchant(e);
  }

  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }
}
