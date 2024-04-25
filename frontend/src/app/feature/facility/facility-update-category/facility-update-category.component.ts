import { FacilityService } from './../service/facility.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FacilityCategory, FacilityCategoryTime } from '../facility.interface';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-facility-update-category',
  templateUrl: './facility-update-category.component.html',
  styleUrls: ['./facility-update-category.component.css']
})
export class FacilityUpdateCategoryComponent {
  apartmentId = 1;
  flagValidasi?: boolean = false;
  index: number = 0;
  dataTime: FacilityCategoryTime[] = [];
  dataTimeAdd: FacilityCategoryTime[] = [];

  @Input() data: FacilityCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}

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

  getFacilityTime(facilityId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityTime(facilityId, '9999-99-99').subscribe({
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

  async onDeleteTime(facilityId:any, id: any){
    await this.updateFacilityTime(id);
    await this.getFacilityTime(facilityId);
  }
  
  onAddTime(){
    this.dataTimeAdd.push({
      id: this.index,
      startTime: null,
      endTime: null,
    })
    this.index++;
  }
  
  onDeleteItem(index: any){
    console.log('Remove:', index);
    let length1 = this.dataTimeAdd.length;
    let temp1 = this.dataTimeAdd.splice(index + 1, length1 - (index + 1));
    this.dataTimeAdd.pop();
    for(let i=0; i<temp1.length; i++){
      this.dataTimeAdd.push(temp1[i]);
    }
  }

  validateTime(): Promise<any>{
    return new Promise<any> (resolve => {
      for(let x of this.dataTimeAdd){
        if(x.startTime == '' || x.startTime == undefined || x.startTime == null || x.endTime == '' || x.endTime == undefined || x.endTime == null){
          resolve('Please fill Facility Time');
        }
        else if(x.startTime > x.endTime){
          resolve('Invalid, Start Time can be greater than End Time,');
        }
      }
      resolve('');
    });
  }

  onUpdateCategory(set:any){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        let result = await this.updateFacilityCategory(this.data['id'], set);
        this.onSubmitEvent.emit();
        this.apps.loadingPage(false);
        this.clearData()

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
            html: 'Failed Update Category',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
      }
    });
  }

  async onButtonSubmit(){
    console.log(this.dataTimeAdd);
    
    let flagTime = '';
    let errorMsg = "";

    if(this.dataTimeAdd.length > 0){
      flagTime = await this.validateTime();
      this.flagValidasi = false;
  
      if(flagTime!=''){
        errorMsg = flagTime;
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
    else{
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
      this.onSubmitEvent.emit();
      this.clearData();
    }
  }
  
  async submitRequest(){
    let result;
    for(let t of this.dataTimeAdd){
      let objTime = {
        'startTime': t.startTime,
        'endTime': t.endTime,
      }
      result = await this.insertFacilityTime(this.data['id'], objTime);
    }

    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();
    this.clearData();

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
        html: 'Failed Update Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setCategoryTime(): Promise<any>{
    return new Promise<any>(resolve => {
      let times: {
          'startTime': any,
          'endTime': any,
        }[] = [];

      for(let t of this.dataTime){
        let objTime = {
          'startTime': t.startTime,
          'endTime': t.endTime,
        }
        times.push(objTime);
      }
      resolve(times);
    });
  }

  updateFacilityCategory(facilityId:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.updateFacilityCategory(facilityId, isActive).subscribe({
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

  insertFacilityTime(facilityId: any, body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.insertFacilityTime(facilityId, body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }

  updateFacilityTime(facilityTimeId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.updateFacilityTime(facilityTimeId, false).subscribe({
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

  clearData(){
    this.index = 0;
    this.dataTime = [];
    this.dataTimeAdd = [];
  }
}
