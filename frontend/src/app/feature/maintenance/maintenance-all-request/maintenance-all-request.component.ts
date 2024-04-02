import { Component } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-maintenance-all-request',
  templateUrl: './maintenance-all-request.component.html',
  styleUrls: ['./maintenance-all-request.component.css']
})
export class MaintenanceAllRequestComponent {
  table: any;
  allDataCount: any;
  filter: string = "";
  col: Column[] = [];

  ngOnInit(){
    this.col = [{name: 'maintenanceCategory', displayName: 'Category'}, {name: 'status', displayName: 'Status'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'assigned', displayName: 'Assigned Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'canceledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
  }

  onListItemClick(e:any){
    console.log(e);
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
  }

  onBackButton(){
    window.location.replace('/maintenance');
  }
}
