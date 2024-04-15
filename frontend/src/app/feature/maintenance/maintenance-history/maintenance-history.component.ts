import { Component } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent {
  table: any;
  allDataCount: any;
  filter: string = '';
  errorMsg: string = '';
  sortCol?: string = 'id';
  sortDir?: string = 'DESC';

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    await this.getMaintenanceResidentRequest(4, 10, 0, this.sortCol, this.sortDir, this.filter);
    this.apps.loadingPage(false);
  }

  getMaintenanceResidentRequest(residentId:any, size:any, page:any, sortBy: any, sortReqDir:any, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceResidentRequest(residentId, size, page, sortBy, sortReqDir, status).subscribe({
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
          this.errorMsg = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.getMaintenanceResidentRequest(1, 10, e, this.sortCol, this.sortDir, this.filter);
  }

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
    this.ngOnInit();
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
