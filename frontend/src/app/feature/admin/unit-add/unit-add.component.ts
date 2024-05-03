import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { Unit } from '../admin.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent {
  user = this.appService.retrieveUser();

  flagValidasi?: boolean = false;
  data: Unit = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private adminService: AdminService, private apps: AppComponent, private appService: AppService){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['type']=="" || this.data['type']=="Type a value" || this.data['type']==undefined){
      errorMsg = "Please fill Unit Type";
    }
    else if(this.data['unitNumber']=="" || this.data['unitNumber']=="Type a value" || this.data['unitNumber']==undefined){
      errorMsg = "Please fill Unit Number";
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
    let body = await this.setBodyInsert();
    let result = await this.addApartmentUnit(body);
    this.onSubmitEvent.emit();
    this.data = {};
    this.apps.loadingPage(false);

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
        html: 'Failed Insert Unit',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyInsert(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'apartmentId': this.user.id,
        'unitNumber': this.data['unitNumber'],
        'type': this.data['type']
      }
      resolve(body);
    });
  }

  addApartmentUnit(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.addApartmentUnit(body).subscribe({
        next: async (response: any) => {
          // console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }
}
