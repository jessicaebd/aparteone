import { Component } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent {
  user = this.appService.retrieveUser();
  
  table: any;
  allDataCount: any;
  keySearch: string = '';
  size = 5;
  page = 0;
  filter: string = '';
  errorMsg: string = '';
  sortCol?: string = 'id';
  sortDir?: string = 'DESC';

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Resident'){
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getMaintenanceResidentRequest(this.user.id, this.size, this.page, this.filter);
      }
      else{
        await this.searchMaintenanceResidentRequest(this.user.id, this.size, this.page, this.keySearch);
      }
    }
    else{
      window.location.replace('');
    }
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

  searchMaintenanceResidentRequest(residentId:any, size:any, page:any, search: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.searchMaintenanceResidentRequest(residentId, size, page, search).subscribe({
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

  onSearchData(){
    this.page = 0;
    this.ngOnInit();
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
  }

  onFilterBy(e:any){
    this.filter = e;
    this.page = 0;
    this.keySearch = '';
    console.log('Filter :', this.filter);
    this.ngOnInit();
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
