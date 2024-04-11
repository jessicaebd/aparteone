import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaintenanceCategory } from '../maintenance.interface';
import Swal from 'sweetalert2';
import { MaintenanceService } from '../service/maintenance.service';

@Component({
  selector: 'app-maintenance-update-category',
  templateUrl: './maintenance-update-category.component.html',
  styleUrls: ['./maintenance-update-category.component.css']
})
export class MaintenanceUpdateCategoryComponent{
  @Input() data: MaintenanceCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private maintenanceService: MaintenanceService){}

  onUpdateActive(e:any){
    this.updateMaintenanceCategory(this.data['ID'], e);
    this.onSubmitEvent.emit();
  }

  updateMaintenanceCategory(id:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.updateMaintenanceCategory(id, isActive).subscribe({
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

  onButtonSubmit(){
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
        this.submitRequest(now, this.data);
      }
    });
  }
  
  submitRequest(now: any, data:any){
    data['Request Date'] = now;
    console.log('Request Date', data['Request Date'])
    alert('SUBMIT ON : ' + now);

    Swal.fire({
      title: 'Success',
      html: 'Requested Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    });

    this.onSubmitEvent.emit();
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
