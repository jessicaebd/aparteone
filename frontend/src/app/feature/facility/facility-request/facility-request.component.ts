import { Component } from '@angular/core';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import Swal from 'sweetalert2';
import { FacilityRequest } from '../facility.interface';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'app-facility-request',
  templateUrl: './facility-request.component.html',
  styleUrls: ['./facility-request.component.css']
})
export class FacilityRequestComponent {

  facilityCategory?: string;
  flagValidasi?: boolean = false;
  typeFacility: listItems[] = [];
  
  data: FacilityRequest = {};
  mandatorySet: FacilityRequest = {'Facility Type': true, 'Book Date': true, 'Book Time': true};

  constructor(private facilityService: FacilityService){}

  async initRequestFacility(categoryID: any){
    this.data = {};
    // await this.getFacilityCategory();
    this.setDropdown(categoryID, this.facilityCategory);
  }

  // getFacilityCategory(): Promise<any>{
  //   return new Promise<any>(resolve => 
  //     this.facilityService.getMaintenanceAllCategory(1).subscribe({
  //       next: async (response: any) => {
  //         console.log('Response: ', response);
  //         this.facilityCategory = response;
  //         resolve(true);
  //       },
  //       error: (error: any) => {
  //         console.log('#error', error);
  //         resolve(error);
  //       }
  //     }))
  // }

  setDropdown(id: any, data: any){
    console.log('CategoryID:', id);
    for(let i=0; i<data.length; i++){
      if(data[i].id==id){
        this.typeFacility.push({
          'code': data[i].category,
          'value': data[i].category,
          'selected': true
        });
        this.data['Facility Type'] = data[i].category;
      }
      else{
        this.typeFacility.push({
          'code': data[i].category,
          'value': data[i].category,
          'selected': false
        });
      }
    }
  }

  setBookTime(e:any){
    this.data['Book Time'] = e;
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Facility Type']=="" || this.data['Facility Type']=="Select a value" || this.data['Facility Type']==undefined){
      errorMsg = "Please choose Facility Type";
    }
    else if(this.data['Book Date']=="" || this.data['Book Date']=="Select a value" || this.data['Book Date']==undefined){
      errorMsg = "Please fill Book Date";
    }
    else if(this.data['Book Time']=="" || this.data['Book Time']=="Select a value" || this.data['Book Time']==undefined){
      errorMsg = "Please choose Book Time";
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
    window.location.replace('/facility');
  }
}
