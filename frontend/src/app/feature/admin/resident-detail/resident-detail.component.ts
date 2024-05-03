import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { Resident } from '../admin.interface';

@Component({
  selector: 'app-resident-detail',
  templateUrl: './resident-detail.component.html',
  styleUrls: ['./resident-detail.component.css']
})
export class ResidentDetailComponent {
  @Input() data: Resident = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private adminService: AdminService, private apps: AppComponent){}

  updateResidentStatus(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.updateResidentStatus(id, status).subscribe({
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

  approveResident(id:any, isApproved:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.approveResident(id, isApproved).subscribe({
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

  onApproveResident(type: any){
    //SUBMIT REQUEST
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        let result = await this.approveResident(this.data['id'], type);
        this.apps.loadingPage(false);
        this.onSubmitEvent.emit();

        if(result==true && type==true){
          Swal.fire({
            title: 'Success',
            html: 'Approved Successfuly',
            icon: 'success',
            confirmButtonColor: '#5025FA'
          });
        }
        else if (result==true && type==false) {
          Swal.fire({
            title: 'Success',
            html: 'Rejected Successfuly',
            icon: 'success',
            confirmButtonColor: '#5025FA'
          });
        }
        else if (type==true) {
          Swal.fire({
            title: 'Error',
            html: 'Failed Approved Resident',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
        else if (type==false) {
          Swal.fire({
            title: 'Error',
            html: 'Failed Reject Resident',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
      }
    });
  }
  
  onUpdateResident(type: any){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        let result = await this.updateResidentStatus(this.data['id'], type);
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
            html: 'Failed Update Resident',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
      }
    });
  }
}
