import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Unit } from '../admin.interface';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent {
  flagValidasi?: boolean = false;
  @Input() data: Unit = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private adminService: AdminService, private apps: AppComponent){}

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
    let body = await this.setBodyUpdate();
    let result = await this.updateApartmentUnit(this.data['id'], body);
    this.onSubmitEvent.emit();
    this.data = {};
    this.apps.loadingPage(false);

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
        html: 'Failed Update Unit',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyUpdate(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'unitNumber': this.data['unitNumber'],
        'type': this.data['type']
      }
      resolve(body);
    });
  }

  updateApartmentUnit(id:any, body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.updateApartmentUnit(id, body).subscribe({
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
