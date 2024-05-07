import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { Resident } from '../admin.interface';

@Component({
  selector: 'app-resident-need-approval',
  templateUrl: './resident-need-approval.component.html',
  styleUrls: ['./resident-need-approval.component.css']
})
export class ResidentNeedApprovalComponent {
  user = this.appService.retrieveUser();

  listResidentApproval: any;
  allDataCount: any;
  errorMsg: string = '';
  pageSize: number = 3;
  pageIndex: number = 0;
  dataResident: Resident = {};
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private adminService: AdminService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Management'){
      await this.getResidentListApproval(this.user.id, this.pageSize, this.pageIndex);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  onClickPageIndex(e:any){
    this.pageIndex = e.pageIndex;
    this.ngOnInit();
  }

  getResidentListApproval(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getResidentList(apartmentId, size, page, 'Pending').subscribe({
        next: async (response: any) => {
          // console.log('Response: ', response);
          if(response.data.length > 0){
            this.listResidentApproval = response.data;
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
          this.listResidentApproval = null;
          resolve(error);
        }
      }))
  }

  async onListItemClick(e:any){
    console.log('OnList:', e);
    this.dataResident = e;
  }

  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }
}
