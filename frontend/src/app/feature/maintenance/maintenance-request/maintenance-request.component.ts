import { Component, EventEmitter, Input, Output } from '@angular/core';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { MaintenanceCategory, MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceService } from '../service/maintenance.service';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent{
  @Input() dataCategory!: MaintenanceCategory
  @Output() onSubmitEvent = new EventEmitter<any>;
  
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  typeMaintenance: listItems[] = [];
  data: MaintenanceRequest = { };

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent, private appService: AppService){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['description']=="" || this.data['description']=="Select a value" || this.data['description']==undefined){
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
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.submitRequest();
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

  async submitRequest(){
    let body = await this.setBodyInsertRequest();
    let result = await this.insertMaintenanceRequest(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();
    this.data = {};
    this.typeMaintenance = [];

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Inserted Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Insert Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyInsertRequest(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'residentId': this.user.id,
        'maintenanceId': this.dataCategory['id'],
        'description': this.data['description']
      }
      resolve(body);
    });
  }

  insertMaintenanceRequest(body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.insertMaintenanceRequest(body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }));
  }

  //temp
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
