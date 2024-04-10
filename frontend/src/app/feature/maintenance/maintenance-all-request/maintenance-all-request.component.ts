import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceDetailRequestComponent } from '../maintenance-detail-request/maintenance-detail-request.component';

@Component({
  selector: 'app-maintenance-all-request',
  templateUrl: './maintenance-all-request.component.html',
  styleUrls: ['./maintenance-all-request.component.css']
})
export class MaintenanceAllRequestComponent {
  table: any;
  allDataCount: any;
  filter: string = "";
  errorMsg?: string;
  col: Column[] = [];
  dataRequest: MaintenanceRequest = {};

  @ViewChild(MaintenanceDetailRequestComponent) detailMaintenance !: MaintenanceDetailRequestComponent;

  ngOnInit(){
    this.col = [{name: 'maintenanceId', displayName: 'Category'}, {name: 'residentId', displayName:'Resident'}, {name: 'createdDate', displayName: 'Created Date'}, {name: 'modifiedDate', displayName: 'Modified Date'}, {name: 'status', displayName: 'Status'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'assignedDate', displayName: 'Assigned Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'cancelledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
    // this.dataRequest = {'Maintenance Type': 'Water Maintenance', 'Maintenance Detail': 'Keran kamar mandi bocor', 'Status': 'Requested', 'Request Date': '2024-12-11', 'Assigned Date': '', 'Assigned Name': '', 'Canceled Date': '2024-12-12', 'Completed Date': ''};
  }

  onListItemClick(e:any){
    console.log(e);
    console.log('Load Data: ');
    this.detailMaintenance.initDetailMaintenance(e);
    console.log('Open Modal');
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
  }

  onBackButton(){
    window.location.replace('/maintenance');
  }
}
