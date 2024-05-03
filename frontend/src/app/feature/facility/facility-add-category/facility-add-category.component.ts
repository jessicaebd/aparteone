import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FacilityCategory } from '../facility.interface';
import Swal from 'sweetalert2';
import { FacilityService } from '../service/facility.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

export interface Time{
  id: any,
  startTime: any,
  endTime: any
}

@Component({
  selector: 'app-facility-add-category',
  templateUrl: './facility-add-category.component.html',
  styleUrls: ['./facility-add-category.component.css']
})
export class FacilityAddCategoryComponent implements OnInit{
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  index: number = 0;
  data: FacilityCategory = {};
  dataTime: Time[] = [];
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private facilityService: FacilityService, private apps: AppComponent, private appService: AppService){}

  ngOnInit() {
    this.index = this.dataTime.length;
    this.onAddTime();
  }

  onAddTime(){
    this.dataTime.push({
      id: this.index,
      startTime: null,
      endTime: null,
    })
    this.index++;
    // console.log(this.dataTime);
  }

  onDeleteItem(index: any){
    // console.log(index);
    let length1 = this.dataTime.length;
    let temp1 = this.dataTime.splice(index + 1, length1 - (index + 1));
    // console.log('SPLICE', temp1);
    this.dataTime.pop();
    // console.log('POP', this.dataTime);
    for(let i=0; i<temp1.length; i++){
      this.dataTime.push(temp1[i]);
    }
    // console.log(this.dataTime);
  }

  validateTime(): Promise<any>{
    return new Promise<any> (resolve => {
      if(this.dataTime.length < 1){
        resolve('Please fill Facility Time');
      }
      else{
        for(let x of this.dataTime){
          if(x.startTime == '' || x.startTime == undefined || x.startTime == null || x.endTime == '' || x.endTime == undefined || x.endTime == null){
            resolve('Please fill Facility Time');
          }
          else if(x.startTime > x.endTime){
            resolve('Invalid, Start Time can be greater than End Time,');
          }
        }
        resolve('');
      }
    });
  }

  async onButtonSubmit(){
    let flagTime = '';
    flagTime = await this.validateTime();
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['image']=="" || this.data['image']==undefined){
      errorMsg = "Please upload Facility Image";
    }
    else if(this.data['category']=="" || this.data['category']=="Select a value" || this.data['category']==undefined){
      errorMsg = "Please fill Facility Name";
    }
    else if(this.data['description']=="" || this.data['description']=="Select a value" || this.data['description']==undefined){
      errorMsg = "Please fill Facility Description";
    }
    else if(flagTime!=''){
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
  
  async submitRequest(){
    let body = await this.setBodyInsertCategory();
    let result = await this.insertFacilityCategory(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();
    this.clearData();

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

  setBodyInsertCategory(): Promise<any>{
    return new Promise<any>(async resolve =>{
      let times = await this.setCategoryTime();
      let body = {
        'apartmentId': this.user.id,
        'image': this.data['image'],
        'category': this.data['category'],
        'description': this.data['description'],
        'facilityTime': times
      }
      resolve(body);
    });
  }

  insertFacilityCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.insertFacilityCategory(body).subscribe({
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
    this.data = {};
    this.dataTime = [];
  }
}
