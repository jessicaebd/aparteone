import { Component, EventEmitter, Output } from '@angular/core';
import { MaintenanceCategory } from '../maintenance.interface';
import Swal from 'sweetalert2';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-maintenance-add-category',
  templateUrl: './maintenance-add-category.component.html',
  styleUrls: ['./maintenance-add-category.component.css']
})
export class MaintenanceAddCategoryComponent {

  flagValidasi?: boolean = false;
  data: MaintenanceCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Category Name']=="" || this.data['Category Name']=="Select a value" || this.data['Category Name']==undefined){
      errorMsg = "Please fill Maintenance Category";
    }
    else if(this.data['Category Desc']=="" || this.data['Category Desc']=="Select a value" || this.data['Category Desc']==undefined){
      errorMsg = "Please fill Maintenance Description";
    }
    else if(this.data['Category Image']=="" || this.data['Category Image']==undefined){
      errorMsg = "Please upload Maintenance Image";
    }
    else{
      this.flagValidasi = true
    }
    
    console.log(this.data);

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
          let now = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
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
    await this.insertMaintenanceCategory(body);
    this.apps.loadingPage(false);

    Swal.fire({
      title: 'Success',
      html: 'Requested Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    });

    this.onSubmitEvent.emit();
  }

  setBodyInsertCategory(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'apartment_id': 1,
        'image': this.data['Category Image'],
        'category': this.data['Category Name'],
        'description': this.data['Category Desc'],
        'is_active': true
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

  backButton(){
    window.location.replace('/maintenance');
  }
}
