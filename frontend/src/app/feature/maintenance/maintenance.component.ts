import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{
  isResident: boolean = false;
  isManagement: boolean = true;

  table: any;
  allDataCount: any;
  filter: string = "";
  col: Column[] = [];
  colCategory: Column[] = [];
  colRequest: Column[] = [];

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location){}
  
  ngOnInit(): void {
    this.colRequest = [{name: 'maintenanceCategory', displayName: 'Category'}, {name: 'status', displayName: 'Status'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'assigned', displayName: 'Assigned Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'canceledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
    this.colCategory = [{name: 'categoryName', displayName: 'Category Name'}, {name: 'status', displayName: 'Status'}, {name: 'createdDate', displayName: 'Created Date'}, {name: 'modifiedDate', displayName: 'Modified Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
  }

  onListItemClick(e:any){
    console.log(e);
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
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
