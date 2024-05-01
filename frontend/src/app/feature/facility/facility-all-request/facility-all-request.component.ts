import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { FacilityRequest } from '../facility.interface';
import { FacilityService } from '../service/facility.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-facility-all-request',
  templateUrl: './facility-all-request.component.html',
  styleUrls: ['./facility-all-request.component.css']
})
export class FacilityAllRequestComponent {
  apartmentId = 1;
  table: any;
  allDataCount: any;
  errorMsg: string = '';
  keySearch: string = '';
  page: number = 0;
  size: number = 10;
  col: Column[] = [];
  dataRequest: FacilityRequest = {}; 

  @ViewChild('closeModal') modalClose: any;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}
  
  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    this.col = [
      {name: 'receiptId', displayName: 'Receipt ID'}, 
      {name: 'residentName', displayName:'Name'}, 
      {name: 'facilityCategory', displayName: 'Category'}, 
      {name: 'reserveDate', displayName: 'Book Date'},
       {name: 'startTime', displayName: 'Start Time'}, 
       {name: 'endTime', displayName: 'End Time'}, 
       {name: 'facilityRequeststatus', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
      this.getFacilityApartmentRequest(this.apartmentId, this.size, this.page);
    }
    else{
      await this.searchFacilityApartmentRequest(this.apartmentId, this.size, this.page, this.keySearch);
    }
    this.apps.loadingPage(false);
  }

  getFacilityApartmentRequest(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityApartmentRequest(apartementId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg= 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  searchFacilityApartmentRequest(apartementId:any, size:any, page:any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.searchFacilityApartmentRequest(apartementId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg= 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['id'] = response.id;
      this.dataRequest['receiptId'] = response.receiptId;
      this.dataRequest['residentId'] = response.residentId;
      this.dataRequest['residentName'] = response.residentName;
      this.dataRequest['residentUnit'] = response.residentUnit;
      this.dataRequest['facilityId'] = response.facilityId;
      this.dataRequest['facilityCategory'] = response.facilityCategory;
      this.dataRequest['facilityTimeId'] = response.facilityTimeId;
      this.dataRequest['reserveDate'] = response.reserveDate;
      this.dataRequest['startTime'] = response.startTime;
      this.dataRequest['endTime'] = response.endTime;
      this.dataRequest['facilityRequeststatus'] = response.facilityRequeststatus;
      this.dataRequest['createdDate'] = response.createdDate;
      this.dataRequest['completedDate'] = response.completedDate;
      this.dataRequest['cancelledDate'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
  }

  onSearchData(key:any){
    this.keySearch = key;
    this.page = 0;
    this.ngOnInit();
  }

  async onListItemClick(e:any){
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  onBackButton(){
    window.location.replace('/facility');
  }
}
