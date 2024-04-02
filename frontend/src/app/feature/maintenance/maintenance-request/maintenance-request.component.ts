import { Component } from '@angular/core';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { MaintenanceRequest } from '../maintenance.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent {

  selectedDropdown?: string;
  flagValidasi?: boolean = false;
  typeMaintenance: listItems[] = [
    {code:"Electricty", value:"eletric"},
    {code:"Water", value:"water"}];
  
  data: MaintenanceRequest = {};
  mandatorySet: MaintenanceRequest = {'Maintenance Type': true, 'Maintenance Detail': true};
  invalidSet: MaintenanceRequest = {'Maintenance Type': false, 'Maintenance Detail': false};

  constructor(){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Maintenance Type']=="" || this.data['Maintenance Type']=="Select a value" || this.data['Maintenance Type']==undefined){
      errorMsg = "Please choose Maintenance Type";
    }
    else if(this.data['Maintenance Detail']=="" || this.data['Maintenance Detail']=="Select a value" || this.data['Maintenance Detail']==undefined){
      errorMsg = "Please fill Maintenance Detail";
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
    console.log('Request Date', data['Request Date'])
    alert('SUBMIT ON : ' + now);

    Swal.fire({
      title: 'Success',
      html: 'Requested Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    });
  }

  backButton(){
    window.location.replace('/maintenance');
  }
}
