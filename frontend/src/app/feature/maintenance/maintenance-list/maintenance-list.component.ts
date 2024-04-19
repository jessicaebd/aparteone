import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent {
  @Input() listRequest!: any;
  @Input() errorMsg!: string;
  @Input() pagination: boolean = true;

  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() showPageSizeOptions?: boolean = true;
  @Input() pageSizeOptions?: any = [5, 10, 25];
  @Input() disabled?: any = false;
  @Input() hidePageSize?: boolean = true;
  @Output() onPageIndexEvent = new EventEmitter<number>;
  
  @Output() onSubmitEvent = new EventEmitter<number>;

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex);
  }

  onCancelEvent(id:any){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        this.submitRequest(id);
      }
    });
  }

  async submitRequest(id:any){
    let result = await this.updateMaintenanceRequest('Cancelled', null, id);
    this.apps.loadingPage(false);

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Cancelled Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Cancel Request',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }

    this.onSubmitEvent.emit();
  }

  updateMaintenanceRequest(status:any, remarks:any, maintenanceRequestId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.updateMaintenanceRequest(status, remarks, maintenanceRequestId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }
}
