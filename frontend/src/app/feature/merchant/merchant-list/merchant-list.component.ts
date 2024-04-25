import { Component } from '@angular/core';
import { Merchant } from '../merchant.interface';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent {
  role : string = 'resident';
  apartmentId = 1;

  merchantCard: Merchant[] = [];
  keySearch: string = '';
  category: string = '';
  errorMsgMerchant: string = '';

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgMerchant = '';
    this.role = this.apps.getUserRole();
    if(this.role=='resident'){
      await this.getMerchantResident(this.apartmentId);
    }
    this.apps.loadingPage(false);
  }
  
  getMerchantResident(apartementId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantResident(apartementId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.merchantCard = response.data;
          }
          else{
            this.errorMsgMerchant = 'No Data Found!'
            this.merchantCard = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgMerchant = 'No Data Found!'
          this.merchantCard = [];
          resolve(error);
        }
      }))
  }

  searchMerchantResident(apartementId:any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.searchMerchantResident(apartementId, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.merchantCard = response.data;
          }
          else{
            this.errorMsgMerchant = 'No Data Found!'
            this.merchantCard = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgMerchant = 'No Data Found!'
          this.merchantCard = [];
          resolve(error);
        }
      }))
  }

  onFilterBy(e:any){
    this.category = e;
    console.log('Filter :', this.category);
    this.ngOnInit();
  }

  onSearchData(){
    console.log('Search :', this.keySearch);
    this.searchMerchantResident(this.apartmentId, this.keySearch);
  }

  goToMerchantStorePage(id: any){
    window.location.replace('/merchant/store/' + id);
  }
}
