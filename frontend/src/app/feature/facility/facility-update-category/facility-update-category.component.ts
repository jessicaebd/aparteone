import { FacilityService } from './../service/facility.service';
import { Component, EventEmitter, Output } from '@angular/core';
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
  data: FacilityCategory = {};
  dataTime: FacilityCategoryTime[] = [];
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}

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
  }

  onDeleteItem(index: any){
    let length1 = this.dataTime.length;
    let temp1 = this.dataTime.splice(index + 1, length1 - (index + 1));
    this.dataTime.pop();
    for(let i=0; i<temp1.length; i++){
      this.dataTime.push(temp1[i]);
    }
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

    if(this.data['Category Image']=="" || this.data['Category Image']==undefined){
      errorMsg = "Please upload Facility Image";
    }
    else if(this.data['Category Name']=="" || this.data['Category Name']=="Select a value" || this.data['Category Name']==undefined){
      errorMsg = "Please fill Facility Name";
    }
    else if(this.data['Category Desc']=="" || this.data['Category Desc']=="Select a value" || this.data['Category Desc']==undefined){
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
    let result = await this.updateFacilityCategory(body);
    this.apps.loadingPage(false);
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
      console.log(times);
      alert('times');
      let body = {
        'apartmentId': this.apartmentId,
        'image': this.data['Category Image'],
        'category': this.data['Category Name'],
        'description': this.data['Category Desc'],
        'facilityTime': times
      }
      resolve(body);
    });
  }

  updateFacilityCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.updateFacilityCategory(body, true).subscribe({
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
