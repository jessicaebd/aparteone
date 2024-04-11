import { Component } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent {
  table: any;
  allDataCount: any;
  filter: string = "";
  errorMsg?: string;
  sortCol?: string = 'created_date';
  sortDir?: string = 'desc';
  col: Column[] = [];

  constructor(private maintenanceService: MaintenanceService){}

  ngOnInit(){
    this.col = [{name: 'maintenance_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    this.getMaintenanceAllRequest(1, 10, 0, this.sortCol, this.sortDir);
  }

  getMaintenanceAllRequest(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(apartementId, size, page, sortBy, sortDir).subscribe({
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

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.getMaintenanceAllRequest(1, 10, e, this.sortCol, this.sortDir);
  }

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
