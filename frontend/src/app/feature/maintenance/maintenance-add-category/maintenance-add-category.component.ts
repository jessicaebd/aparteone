import { Component, EventEmitter, Output } from '@angular/core';
import { MaintenanceCategory } from '../maintenance.interface';
import Swal from 'sweetalert2';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-maintenance-add-category',
  templateUrl: './maintenance-add-category.component.html',
  styleUrls: ['./maintenance-add-category.component.css']
})
export class MaintenanceAddCategoryComponent {
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  data: MaintenanceCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent, private appService: AppService){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['image']=="" || this.data['image']==undefined){
      errorMsg = "Please upload Maintenance Image";
    }
    else if(this.data['category']=="" || this.data['category']=="Select a value" || this.data['category']==undefined){
      errorMsg = "Please fill Maintenance Name";
    } 
    else if(this.data['description']=="" || this.data['description']=="Select a value" || this.data['description']==undefined){
      errorMsg = "Please fill Maintenance Description";
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
    let body = await this.setBodyInsertCategory();
    let result = await this.insertMaintenanceCategory(body);
    this.apps.loadingPage(false);
    this.data = { };
    this.onSubmitEvent.emit();

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

  setBodyInsertCategory(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'apartmentId': this.user.id,
        'image': this.data['image'],
        'category': this.data['category'],
        'description': this.data['description'],
        'isActive': true
      }
      resolve(body);
    });
  }

  insertMaintenanceCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.insertMaintenanceCategory(body).subscribe({
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
}
