import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MaintenanceRequest } from '../maintenance.interface';

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
  @Output() onUpdateRequest = new EventEmitter<any>;

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
          let now = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
          this.submitRequest(type, now, this.data);
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
        let now = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
        this.submitRequest(type, now, this.data);
      }
    });
  }

  submitRequest(type:any, now: any, data:any){
    data['Request Date'] = now;
    console.log('Request Type', type);
    console.log('Request Data', data);
    alert('SUBMIT ON : ' + now);

    Swal.fire({
      title: 'Success',
      html: 'Requested Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    });

    this.onUpdateRequest.emit();
  }
}
