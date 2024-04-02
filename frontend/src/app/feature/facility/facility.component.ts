import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent {
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
    this.colCategory = [{name: 'categoryName', displayName: 'Category Name'}, {name: 'startTime', displayName:'Start Time'}, {name: 'endTime', displayName:'End Time'}, {name: 'status', displayName: 'Status'}, {name: 'createdDate', displayName: 'Created Date'}, {name: 'modifiedDate', displayName: 'Modified Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
    this.colRequest = [{name: 'facilityCategory', displayName: 'Category'}, {name: 'startTime', displayName:'Start Time'}, {name: 'endTime', displayName:'End Time'}, {name: 'status', displayName: 'Status'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'canceledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
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
    window.location.replace('/facility/history');
  }

  onAllRequest(){
    window.location.replace('/facility/list');
  }
}
