import { Component, NgModule, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

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

  constructor(private apps: AppComponent, private appService: AppService){  }

  async ngOnInit(){
    this.apps.loadingPage(true);
    console.log('STATE:', this.isGuest);
    if(!this.appService.retrieveAccessToken()){
      this.isGuest = true;
    }
    else {
      this.user = this.appService.retrieveUser();
      if(this.user.role=='Admin'){
        this.apartmentCount = await this.getApartmentTotal();
      }
      else if(this.user.role=='Management'){
        this.residentCount = await this.countResidentByApartmentId(this.user.id);
        this.merchantCount = await this.countMerchantByApartmentId(this.user.id);
      }
      else if(this.user.role=='Resident'){
        this.countBilling = await this.countBillingDetailByResidentId(this.user.id);
        this.countFacility = await this.countFacilityRequestByResidentId(this.user.id);
        this.countMailbox = await this.countMailboxDetailByResidentId(this.user.id);
        this.countMaintenance = await this.countMaintenanceRequestByResidentId(this.user.id);
      }
    }
    console.log('STATE:', this.isGuest);
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

  countResidentByApartmentId(apartmentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countResidentByApartmentId(apartmentId).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  countMerchantByApartmentId(apartmentId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.countMerchantByApartmentId(apartmentId).subscribe({
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

  goToFeaturePage(e:any){
    window.location.replace('/' + e);
  }

  showLatestRequest(f:string) {
    this.latestRequest = f;
  }

  showLatestApproval(e:string) {
    this.latestApproval = e;
  }
}
