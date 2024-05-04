import { Component, EventEmitter, Input, Output } from '@angular/core';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { FacilityCategory, FacilityCategoryTime, FacilityRequest } from '../facility.interface';
import { FacilityService } from '../service/facility.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-facility-request',
  templateUrl: './facility-request.component.html',
  styleUrls: ['./facility-request.component.css']
})
export class FacilityRequestComponent {
  @Input() dataCategory: FacilityCategory = {}
  @Output() onSubmitEvent = new EventEmitter<any>;
  
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  typeFacility: listItems[] = [];
  data: FacilityRequest = { };
  dataTime: FacilityCategoryTime[] = [];

  constructor(private facilityService: FacilityService, private apps: AppComponent, private appService: AppService){}

  setTimelist(response:any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataTime = response.map((data:any) => ({
        id: data.id,
        startTime : data.startTime,
        endTime : data.endTime,
        isActive: data.isActive,
        isAvailable: data.isAvailable,
      }));
      resolve(true);
    })
  }

  getFacilityTime(facilityId:any, date: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityTime(facilityId, date).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          await this.setTimelist(response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }
    ))
  }

  async onChangeDate(id:any, date:any){
    this.apps.loadingPage(true);
    this.data['reserveDate'] = date;
    await this.getFacilityTime(id, date);
    this.apps.loadingPage(false);
  }

  onTimeClick(id:any){
    if(this.data['reserveDate']=="" || this.data['reserveDate']=="dd/mm/yyyy" || this.data['reserveDate']==undefined){
      Swal.fire({
        title: 'Validasi',
        text: 'Please choose Book Date',
        icon: 'warning',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      this.data['facilityTimeId']=id
    }
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['reserveDate']=="" || this.data['reserveDate']=="dd/mm/yyyy" || this.data['reserveDate']==undefined){
      errorMsg = "Please choose Book Date";
    }
    else if(this.data['facilityTimeId']=="" || this.data['facilityTimeId']==undefined){
      errorMsg = "Please choose Book Time";
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
    let result = await this.insertFacilityRequest(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();
    this.data = {};

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
        'facilityTimeId': this.data['facilityTimeId'],
        'reserveDate': this.data['reserveDate']
      }
      resolve(body);
    });
  }

  insertFacilityRequest(body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.insertFacilityRequest(body).subscribe({
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

  backButton(){
    window.location.replace('/facility');
  }
}
