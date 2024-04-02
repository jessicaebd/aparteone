import { Component } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-facility-all-request',
  templateUrl: './facility-all-request.component.html',
  styleUrls: ['./facility-all-request.component.css']
})
export class FacilityAllRequestComponent {
  table: any;
  allDataCount: any;
  filter: string = "";
  col: Column[] = [];

  ngOnInit(){
    this.col = [{name: 'facilityCategory', displayName: 'Category'}, {name: 'startTime', displayName:'Start Time'}, {name: 'endTime', displayName:'End Time'}, {name: 'status', displayName: 'Status'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'completedDate', displayName: 'Completed Date'}, {name: 'canceledDate', displayName: 'Cancel Date'},  {name:"ActionCol", displayName:"Action", align:"center"}];
  }

  onListItemClick(e:any){
    console.log(e);
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
  }

  onBackButton(){
    window.location.replace('/facility');
  }
}
