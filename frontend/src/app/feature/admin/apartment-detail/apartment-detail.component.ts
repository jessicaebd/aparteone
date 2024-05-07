import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Apartment } from '../admin.interface';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent {
  @Input() data: Apartment = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private adminService: AdminService, private apps: AppComponent){}

  updateApartmentStatus(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.updateApartmentStatus(id, status).subscribe({
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

  approveApartment(id:any, isApproved:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.approveApartment(id, isApproved).subscribe({
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
        let result = await this.approveApartment(this.data['id'], type);
        this.onSubmitEvent.emit();
        this.apps.loadingPage(false);

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
            html: 'Failed Approved Apartment',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
        else if (type==false) {
          Swal.fire({
            title: 'Error',
            html: 'Failed Reject Apartment',
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
        let result = await this.updateApartmentStatus(this.data['id'], type);
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
            html: 'Failed Update Apartment',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
      }
    });
  }
}
