import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { Location } from '@angular/common';
import { Apartment, Unit } from '../admin.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-apartment-need-approval',
  templateUrl: './apartment-need-approval.component.html',
  styleUrls: ['./apartment-need-approval.component.css']
})
export class ApartmentNeedApprovalComponent {
  user = this.appService.retrieveUser();

  tableApartmentApproval: any;
  allDataApartmentApproval: any;
  errorMsgApartmentApproval?: string;
  pageApartmentApproval = 0;
  sizeApartmentApproval = 5;
  colApartmentApproval: Column[] = [];
  dataApartment: Apartment = {};

  @ViewChild('closeModalApartment') modalCloseApartment: any;

  constructor(private location: Location, private adminService: AdminService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgApartmentApproval = '';
    if(this.user.role=='Admin'){
      this.colApartmentApproval = [{name: 'name', displayName: 'Apartment'}, {name: 'province', displayName: 'Province'}, {name: 'city', displayName: 'City'}, {name: 'isApproved', displayName:'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      await this.getApartmentListApproval(this.sizeApartmentApproval, this.pageApartmentApproval);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getApartmentListApproval(size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentList(size, page, 'Pending').subscribe({
        next: async (response: any) => {
          // console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableApartmentApproval = response.data;
            this.allDataApartmentApproval = response.totalElements;
          }
          else{
            this.tableApartmentApproval = null;
            this.errorMsgApartmentApproval = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgApartmentApproval = 'No Data Found!'
          this.tableApartmentApproval = null;
          resolve(error);
        }
      }))
  }

  async onListItemClick(type:any, e:any){
    console.log('OnList:', e);
    if(type=='apartment'){
      this.dataApartment = e;
    }
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='approval'){
      this.pageApartmentApproval = e;
    }
    this.ngOnInit();
  }
  
  redirect(type:any){
    if(type=='apartment'){
      this.modalCloseApartment.nativeElement.click();
    }
    this.ngOnInit();
  }

  backButton(){
    this.location.back();
  }
}
