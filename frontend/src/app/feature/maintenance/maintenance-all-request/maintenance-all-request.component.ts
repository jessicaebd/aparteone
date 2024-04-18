import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceDetailRequestComponent } from '../maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceService } from '../service/maintenance.service';

@Component({
  selector: 'app-maintenance-all-request',
  templateUrl: './maintenance-all-request.component.html',
  styleUrls: ['./maintenance-all-request.component.css']
})
export class MaintenanceAllRequestComponent {
  apartmentId = 1;

  table: any;
  allDataCount: any;
  filter: string = "";
  errorMsg?: string;
  page = 0;
  size = 10;
  sortCol?: string = 'created_date';
  sortDir?: string = 'desc';
  col: Column[] = [];
  dataRequest: MaintenanceRequest = {};

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(MaintenanceDetailRequestComponent) detailMaintenance !: MaintenanceDetailRequestComponent;

  constructor(private maintenanceService: MaintenanceService){}

  ngOnInit(){
    this.col = [{name: 'maintenanceCategory', displayName: 'Category'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'residentName', displayName:'Requested By'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    this.getMaintenanceAllRequest(this.apartmentId, this.size, this.page);
  }

  getMaintenanceAllRequest(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(apartementId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  async onListItemClick(e:any){
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident Name'] = response.resident;
      this.dataRequest['Maintenance ID'] = response.maintenanceId;
      this.dataRequest['Maintenance Category'] = response.maintenanceCategory;
      this.dataRequest['Maintenance Detail'] = response.maintenanceDetail;
      this.dataRequest['Status'] = response.status;
      this.dataRequest['Request Date'] = response.requestDate;
      this.dataRequest['Assigned Name'] = response.assignedTo;
      this.dataRequest['Assigned Date'] = response.assignedDate;
      this.dataRequest['Completed Date'] = response.completedDate;
      this.dataRequest['Cancelled Date'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
    // this.getMaintenanceAllRequest(1, 10, e, this.sortCol, this.sortDir);
  }

  // async onSortData(e:any){
  //   console.log("OnSort: ", e);
  //   let arr = await this.onSplitSortEvent(e);
  //   console.log(arr);
  //   // this.getMaintenanceAllRequest(1, 10, 0, this.sortCol, this.sortDir);
  // }

  // onSplitSortEvent(e:any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     let arr = e.split(";", 2); 
  //     this.sortCol = arr[0];
  //     this.sortDir = arr[1];
  //     resolve(arr);
  //   });
  // }

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  onBackButton(){
    window.location.replace('/maintenance');
  }
}
