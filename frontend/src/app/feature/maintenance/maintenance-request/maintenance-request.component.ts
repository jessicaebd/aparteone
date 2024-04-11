import { Component, EventEmitter, Input, Output } from '@angular/core';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { MaintenanceCategory, MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceService } from '../service/maintenance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent{
  @Input() dataCategory!: MaintenanceCategory
  @Output() onSubmitEvent = new EventEmitter<any>;
  
  maintenanceCategory!: any;
  flagValidasi?: boolean = false;
  typeMaintenance: listItems[] = [];
  data: MaintenanceRequest = { };

  constructor(private maintenanceService: MaintenanceService){}

  onButtonSubmit(){
    console.log(this.dataCategory['Category Name']);
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Maintenance Detail']=="" || this.data['Maintenance Detail']=="Select a value" || this.data['Maintenance Detail']==undefined){
      errorMsg = "Please fill Maintenance Detail";
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
          this.submitRequest(now, this.data);
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

  submitRequest(now: any, data:any){
    data['Request Date'] = now;
    console.log('Request Date', data['Request Date']);
    alert('SUBMIT ON : ' + now);

    Swal.fire({
      title: 'Success',
      html: 'Requested Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    }).then((result) => {
      if(result.value){
        this.data = {};
        console.log('CLEAR DATA:', this.data);
        this.typeMaintenance = [];
        this.onSubmitEvent.emit();
      }
    });

  }

  //temp
  // getMaintenanceCategory(): Promise<any>{
  //   return new Promise<any>(resolve => 
  //     this.maintenanceService.getMaintenanceAllCategory(1, 10, 0).subscribe({
  //       next: async (response: any) => {
  //         console.log('Response: ', response);
  //         this.maintenanceCategory = response;
  //         resolve(true);
  //       },
  //       error: (error: any) => {
  //         console.log('#error', error);
  //         resolve(error);
  //       }
  //     }))
  // }

  // setDropdown(id: any, data: any){
  //   console.log('CategoryID:', id);
  //   for(let i=0; i<data.length; i++){
  //     if(data[i].id==id){
  //       this.typeMaintenance.push({
  //         'code': data[i].category,
  //         'value': data[i].category,
  //         'selected': true
  //       });
  //       this.data['Maintenance Category'] = data[i].category;
  //     }
  //     else{
  //       this.typeMaintenance.push({
  //         'code': data[i].category,
  //         'value': data[i].category,
  //         'selected': false
  //       });
  //     }
  //   }
  // }
}
