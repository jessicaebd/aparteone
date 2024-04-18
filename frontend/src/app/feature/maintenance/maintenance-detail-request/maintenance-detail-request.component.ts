import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-maintenance-detail-request',
  templateUrl: './maintenance-detail-request.component.html',
  styleUrls: ['./maintenance-detail-request.component.css']
})
export class MaintenanceDetailRequestComponent{
  flagValidasi: boolean = false;
  flagAssign: boolean = false;
  flagCompleted: boolean = false;
  @Input() data!: MaintenanceRequest;
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  updateMaintenanceRequest(id:any, status:any, remarks:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.updateMaintenanceRequest(id, status, remarks).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  onButtonAssign(type: any){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Assigned Name']=="" || this.data['Assigned Name']==undefined){
      errorMsg = "Please fill Assigned Name";
    }
    else{
      this.flagValidasi = true
    }

    if(this.flagValidasi){
      //SUBMIT REQUEST
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
          this.submitRequest(type);
        }
      });
    }
    else{
      Swal.fire({
        title: 'Validasi',
        html: errorMsg,
        icon: 'warning',
        confirmButtonColor: '#5025FA'
      });
    }
  }
  
  onButtonClick(type: any){
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
        this.submitRequest(type);
      }
    });
  }

  async submitRequest(type:any){
    let result = await this.updateMaintenanceRequest(this.data['ID'], type, this.data['Assigned Name']);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Update Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
