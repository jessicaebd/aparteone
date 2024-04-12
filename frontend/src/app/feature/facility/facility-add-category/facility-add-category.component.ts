import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FacilityCategory } from '../facility.interface';
import Swal from 'sweetalert2';

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
  flagValidasi?: boolean = false;
  index: number = 0;
  data: FacilityCategory = {};
  dataTime: Time[] = [];
  mandatorySet: FacilityCategory = {'Category Name': true};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(){}

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
    console.log(this.dataTime);
  }

  onDeleteItem(index: any){
    console.log(index);
    let length1 = this.dataTime.length;
    let temp1 = this.dataTime.splice(index + 1, length1 - (index + 1));
    console.log('SPLICE', temp1);
    this.dataTime.pop();
    console.log('POP', this.dataTime);
    for(let i=0; i<temp1.length; i++){
      this.dataTime.push(temp1[i]);
    }
    console.log(this.dataTime);
  }

  onButtonSubmit(){
    // this.data['Category Time'];
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Category Name']=="" || this.data['Category Name']==undefined){
      errorMsg = "Please fill Facility Category";
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

    this.onSubmitEvent.emit();
  }

  backButton(){
    window.location.replace('/facility');
  }
}
