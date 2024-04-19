import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FacilityService } from '../service/facility.service';
import { AppComponent } from 'src/app/app.component';
import { FacilityRequest } from '../facility.interface';

@Component({
  selector: 'app-facility-detail-request',
  templateUrl: './facility-detail-request.component.html',
  styleUrls: ['./facility-detail-request.component.css']
})
export class FacilityDetailRequestComponent {
  @Input() data: FacilityRequest = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}

  updateFacilityRequest(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.updateFacilityRequest(id, status).subscribe({
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

  async submitRequest(status:any){
    let result = await this.updateFacilityRequest(this.data['ID'], status);
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
        html: 'Failed Update Request',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
