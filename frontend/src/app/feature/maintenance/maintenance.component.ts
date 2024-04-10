import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceService } from './service/maintenance.service';
import { MaintenanceDetailRequestComponent } from './maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceCategory, MaintenanceRequest } from './maintenance.interface';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{
  isResident: boolean = true;
  isManagement: boolean = true;

  tableCategory: any;
  tableRequest: any;
  allDataCategory: any;
  allDataRequest: any;
  filter: string = "";
  errorMsgCategory?: string;
  errorMsgRequest?: string;
  colCategory: Column[] = [];
  colRequest: Column[] = [];
  dataRequest: MaintenanceRequest = {};
  
  @ViewChild('closeModal') modalClose: any;
  @ViewChild(MaintenanceDetailRequestComponent) detailMaintenance !: MaintenanceDetailRequestComponent;

  constructor(private location: Location, private maintenanceService: MaintenanceService){}
  
  ngOnInit(): void {
    this.colRequest = [{name: 'maintenanceID', displayName: 'Category'}, {name: 'residentId', displayName:'Resident'}, {name: 'createdDate', displayName: 'Created Date'}, {name: 'modifiedDate', displayName: 'Modified Date'}, {name: 'status', displayName: 'Status'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'assignedDate', displayName: 'Assigned Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'cancelledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
    this.colCategory = [{name: 'category', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];

    this.getMaintenanceAllCategory(1,1,0);
    // this.getMaintenanceAllRequest();
  }

  getMaintenanceAllCategory(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllCategory(apartementId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.tableCategory = response.data;

          let data = this.tableCategory.data.map((item:any) => {
            if(item.keys=='isActive'){
              return item['isActive'] ? 'Active': 'In-Active';
            }
            else{
              return item;
            }
          });

          // let data = this.tableCategory.map((item:any) => {
          //   return Object.keys(item).filter(key => key != 'masterid').map(key => {
          //     if(key == 'tanggal'){
          //       return item['isActive'] ? 'Active': 'In-Active';
          //     }
          //     else{
          //       return item[key]
          //     }
          //   });
          // });
          console.log('Data:', data)
          // this.tableCategory = <any> response.data.map((item) => {
          //   if(item.isActive){
          //     return item.isActive = 'Active';
          //   }
          //   else{
          //     return item.isActive = 'In-Active';
          //   }
          // });
          // this.allDataCategory = response.totalElements;
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  getMaintenanceAllRequest(): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(1, 10, 0).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.tableRequest = response.data;
          // if data null
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  async onListItemClick(type: string, e:any){
    console.log(e);
    if(type=='request'){
      await this.setDataRequest(e);
      console.log('Data Request:', this.dataRequest);
      this.detailMaintenance.initDetailMaintenance(this.dataRequest);
    }
  }

  setTableCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      // for(let i=0; i<response.length; i++){
      //   this.tableCategory[i]['ID'] = response.id;
      //   this.tableCategory[i]['Created Date'] = response.createdDate;
      //   this.tableCategory[i]['Created Date'] = response.createdDate;
      //   this.tableCategory[i]['Created Date'] = response.createdDate;
      //   this.tableCategory[i]['Status'] = (response.isActive? 'Active': 'In-Active');
      // }
      resolve(true);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['Resident'] = response.residentId;
      this.dataRequest['Assigned Date'] = response.assignedDate;
      this.dataRequest['Assigned Name'] = response.assignedTo;
      this.dataRequest['Canceled Date'] = response.cancelledDate;
      this.dataRequest['Completed Date'] = response.completedDate;
      // this.dataRequest['Maintenance Detail'] = response.maintenanceDetail;
      this.dataRequest['Maintenance Type'] = response.maintenanceId-1;
      // this.dataRequest['Maintenance Type'] = this.tableCategory[this.tableCategory.findIndex(x => x.ID === response.maintenanceId)]['Category Name'];;
      this.dataRequest['Request Date'] = response.createdDate;
      this.dataRequest['Modified Date'] = response.modifiedDate;
      this.dataRequest['Status'] = response.status;
      resolve(true);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.getMaintenanceAllCategory(1,1,e);
  }

  backButton(){
    this.location.back();
  }
  
  onSubmitAddCategory(){
    console.log('Modal Closed');
    this.modalClose.nativeElement.click();
  }

  onHistoryClick(){
    window.location.replace('/maintenance/history');
  }

  onAllRequest(){
    window.location.replace('/maintenance/list');
  }
}
