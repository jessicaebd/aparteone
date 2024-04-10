import { Component, EventEmitter, Output } from '@angular/core';
import { Announcement } from '../announcement.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcement-update',
  templateUrl: './announcement-update.component.html',
  styleUrls: ['./announcement-update.component.css']
})
export class AnnouncementUpdateComponent {

  flagValidasi?: boolean = false;
  data: Announcement = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['Announcement Title']=="" || this.data['Announcement Title']=="Select a value" || this.data['Announcement Title']==undefined){
      errorMsg = "Please fill Announcement Title";
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
      html: 'Updated Successfuly',
      icon: 'success',
      confirmButtonColor: '#5025FA'
    });

    this.onSubmitEvent.emit();
  }
}
