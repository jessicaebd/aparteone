import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../announcement.interface';
import { AnnouncementService } from '../service/announcement.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcement-update',
  templateUrl: './announcement-update.component.html',
  styleUrls: ['./announcement-update.component.css']
})
export class AnnouncementUpdateComponent {
  @Input() data: Announcement = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  flagValidasi?: boolean = false;
  startDate!: Date;
  endDate!: Date;

  constructor(private announcementService: AnnouncementService, private apps: AppComponent){}

  onInitView(){
    console.log('INIT!');
    console.log(this.data);
    document.querySelectorAll('.paragraf')[0].innerHTML = this.data.description;
    this.startDate = new Date(this.data['startDate']);
    this.endDate = new Date(this.data['endDate']);
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['image']=="" || this.data['image']==undefined){
      errorMsg = "Please Upload Announcement Image";
    }
    else if(this.data['title']=="" || this.data['title']=="Select a value" || this.data['title']==undefined){
      errorMsg = "Please Fill Announcement Title";
    }
    else if(this.data['description']=="" || this.data['description']=="Select a value" || this.data['description']==undefined){
      errorMsg = "Please Fill Announcement Detail";
    }
    else if(this.data['startDate']=="" || this.data['startDate']=="dd/mm/yyyy" || this.data['startDate']==undefined){
      errorMsg = "Please Choose Start Date";
    }
    else if(this.data['endDate']=="" || this.data['endDate']=="dd/mm/yyyy" || this.data['endDate']==undefined){
      errorMsg = "Please Choose End Date";
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
    let body = await this.setBodyInsertAnnouncement();
    let result = await this.insertMaintenanceCategory(body);
    this.apps.loadingPage(false);

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else{
      Swal.fire({
        title: 'Error',
        html: 'Failed Insert Announcement',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
    this.data = {};
    this.onSubmitEvent.emit();
  }

  setBodyInsertAnnouncement(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'apartmentId': 1,
        'image': this.data['image'],
        'title': this.data['title'],
        'description': this.data['description'],
        'startDate': this.data['startDate'],
        'endDate': this.data['endDate'],
      }
      resolve(body);
    });
  }

  insertMaintenanceCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.insertAnnouncement(body).subscribe({
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
