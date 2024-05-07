import { Component } from '@angular/core';
import { Merchant } from '../merchant.interface';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent {
  user = this.appService.retrieveUser();

  merchantCard: Merchant[] = [];
  keySearch: string = '';
  category: string = '';
  errorMsgMerchant: string = '';

  constructor(private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgMerchant = '';
    if(this.user.role=='Resident'){
      await this.getMerchantResident(this.user.apartmentId);
    }
    else {
      window.location.replace('');
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
    this.searchMerchantResident(this.user.apartmentId, this.keySearch);
  }

  goToMerchantStorePage(id: any){
    window.location.replace('/merchant/store/' + id);
  }
}
