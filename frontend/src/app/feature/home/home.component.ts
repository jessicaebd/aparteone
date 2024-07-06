import { Component, NgModule, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { MerchantService } from '../merchant/service/merchant.service';
import { Transaction } from '../merchant/merchant.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  user!: any;
  isGuest = false;

  latestRequest: string = 'maintenance';
  latestApproval: string = 'resident';
  dateInformation!: string;

  flagPayment: boolean = true;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;

  apartmentCount: number = 0;
  residentCount: number = 0;
  merchantCount: number = 0;
  
  countFacility: number = 0;
  countMaintenance: number = 0;
  countMailbox: number = 0;
  countBilling: number = 0;

  pendingTransaction: number = 0;
  deliveryTransaction: number = 0;
  completedTransaction: number = 0;
  paymentApproval: number = 0;

  listTransaction: Transaction[] = [];

  constructor(private apps: AppComponent, private appService: AppService, private merchantService: MerchantService){  }

  async ngOnInit(){
    this.apps.loadingPage(true);
    if(!this.appService.retrieveAccessToken()){
      this.isGuest = true;
    }
    else {
      this.user = this.appService.retrieveUser();
      if(this.user.role=='Admin'){
        this.apartmentCount = await this.getApartmentTotal();
        this.residentCount = await this.countResident(null);
        this.merchantCount = await this.countMerchant(null);
      }
      else if(this.user.role=='Management'){
        this.residentCount = await this.countResident(this.user.id);
        this.merchantCount = await this.countMerchant(this.user.id);
      }
      else if(this.user.role=='Resident'){
        this.countBilling = await this.countBillingDetailByResidentId(this.user.id);
        this.countFacility = await this.countFacilityRequestByResidentId(this.user.id);
        this.countMailbox = await this.countMailboxDetailByResidentId(this.user.id);
        this.countMaintenance = await this.countMaintenanceRequestByResidentId(this.user.id);
      }
      else if(this.user.role=='Merchant'){
        this.dateInformation = new Date().toLocaleString('en-us',{month:'short', year:'numeric'});
        await this.getTransactionMerchant(this.user.id, 99999, 0);
        await this.setCountMerchant(this.listTransaction);
      }
    }
    this.apps.loadingPage(false);
  }

  getApartmentTotal(): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.getApartmentTotal().subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countResident(apartmentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countResident(apartmentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countMerchant(apartmentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countMerchant(apartmentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countBillingDetailByResidentId(residentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countBillingDetailByResidentId(residentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countFacilityRequestByResidentId(residentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countFacilityRequestByResidentId(residentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countMailboxDetailByResidentId(residentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countMailboxDetailByResidentId(residentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countMaintenanceRequestByResidentId(residentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countMaintenanceRequestByResidentId(residentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  // countPendingTransaction(residentId:any): Promise<any>{
  //   return new Promise<any>(resolve => 
  //     this.appService.countPendingTransaction(residentId).subscribe({
  //       next: async (response: any) => {
  //         resolve(response);
  //       },
  //       error: (error: any) => {
  //         console.log('#error', error);
  //         resolve(error);
  //       }
  //     }))
  // }

  getTransactionMerchant(merchantId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getTransactionMerchant(merchantId, size, page, null).subscribe({
        next: async (response: any) => {
          console.log('Response Merchant: ', response);
          this.listTransaction = response.data;
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.listTransaction = [];
          resolve(error);
        }
      }))
  }

  setCountMerchant(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      this.pendingTransaction = 0;
      this.deliveryTransaction = 0;
      this.completedTransaction = 0;
      this.paymentApproval = 0;
  
      for(let item of e){
        if(item.status=='Pending'){
          this.paymentApproval++;
        }
        else if(item.status=='On Delivery'){
          this.deliveryTransaction++;
        }
        else if(item.status=='Waiting for Confirmation'){
          this.paymentApproval++;
        }
        else if(item.status=='Completed'){
          this.completedTransaction++;
        }
      }
  
      console.log('Pending:', this.pendingTransaction);
      resolve(true);
    });
  }

  goToFeaturePage(e:any){
    window.location.replace('/' + e);
  }

  showLatestRequest(f:string) {
    this.latestRequest = f;
  }

  showLatestApproval(e:string) {
    this.latestApproval = e;
  }

  redirectToRegister(){
    window.location.replace('/register');
  }
}
