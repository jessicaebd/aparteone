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
  page: number = 0;
  size: number = 10;
  col: Column[] = [];
  dataRequest: FacilityRequest = {}; 

  @ViewChild('closeModal') modalClose: any;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}
  
  ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    this.col = [{name: 'facilityCategory', displayName: 'Category'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'residentUnit', displayName:'Unit'}, {name: 'residentName', displayName:'Resident'}, {name: 'startTime', displayName: 'Start Time'}, {name: 'endTime', displayName: 'End Time'}, {name: 'facilityRequeststatus', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    this.getFacilityApartmentRequest(this.apartmentId, this.size, this.page);
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

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident ID'] = response.residentId;
      this.dataRequest['Resident Name'] = response.residentName;
      this.dataRequest['Resident Unit'] = response.residentUnit;
      this.dataRequest['Facility ID'] = response.facilityId;
      this.dataRequest['Facility Category'] = response.facilityCategory;
      this.dataRequest['Facility Time ID'] = response.facilityTimeId;
      // this.dataRequest['Book Date'] = response.FacilityDetail;
      this.dataRequest['Start Time'] = response.startTime;
      this.dataRequest['End Time'] = response.endTime;
      this.dataRequest['Status'] = response.facilityRequeststatus;
      this.dataRequest['Request Date'] = response.requestDate;
      this.dataRequest['Completed Date'] = response.completedDate;
      this.dataRequest['Cancelled Date'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
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

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  onBackButton(){
    window.location.replace('/facility');
  }
}
