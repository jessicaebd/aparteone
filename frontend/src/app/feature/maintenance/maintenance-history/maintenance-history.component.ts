import { Component } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent {
  residentId = 4;
  
  table: any;
  allDataCount: any;
  size = 5;
  page = 0;
  filter: string = '';
  errorMsg: string = '';
  sortCol?: string = 'id';
  sortDir?: string = 'DESC';

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    await this.getMaintenanceResidentRequest(this.residentId, this.size, this.page, this.filter);
    this.apps.loadingPage(false);
  }

  getMaintenanceResidentRequest(residentId:any, size:any, page:any, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceResidentRequest(residentId, size, page, status).subscribe({
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
    this.page = e;
    this.ngOnInit();
  }

  onFilterBy(e:any){
    this.filter = e;
    this.page = 0;
    console.log('Filter :', this.filter);
    this.ngOnInit();
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
