import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { FacilityRequest } from '../facility.interface';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'app-facility-upcoming',
  templateUrl: './facility-upcoming.component.html',
  styleUrls: ['./facility-upcoming.component.css']
})
export class FacilityUpcomingComponent {
  user = this.appService.retrieveUser();

  listUpcoming: any;
  allDataCount: any;
  errorMsg: string = '';
  pageSize: number = 3;
  pageIndex: number = 0;
  dataRequest: FacilityRequest = {};  
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private facilityService: FacilityService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Resident'){
      await this.getFacilityResidentRequest(this.user.id, this.pageSize, this.pageIndex);
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

  getFacilityResidentRequest(residentId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityResidentRequest(residentId, size, page, 'Requested').subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listUpcoming = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!';
          this.listUpcoming = null;
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
  
  async onListItemClick(e:any){
    let data = await this.setDataRequest(e);
  }

  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }
}
