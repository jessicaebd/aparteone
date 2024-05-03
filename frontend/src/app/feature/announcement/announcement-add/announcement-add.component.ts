import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Announcement } from '../announcement.interface';
import { AnnouncementService } from '../service/announcement.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent {
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  data: Announcement = {};
  description!: any;
  range!: any;
  sel!: any;
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private announcementService: AnnouncementService, private apps: AppComponent, private appService: AppService){}

  onButtonSubmit(){
    this.description = document.getElementById("description")!.innerHTML;
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['image']=="" || this.data['image']==undefined){
      errorMsg = "Please Upload Announcement Image";
    }
    else if(this.data['title']=="" || this.data['title']=="Select a value" || this.data['title']==undefined){
      errorMsg = "Please Fill Announcement Title";
    }
    else if(this.description=="" || this.description==null || this.description==undefined){
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
    let body = await this.setBodyInsertAnnouncement();
    let result = await this.insertAnnouncement(body);
    await this.setSelection();
    setTimeout(()=>{
      document.execCommand('insertHTML', false, this.data['description']);
    }, 1000);
    this.data = {};
    this.apps.loadingPage(false);

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Inserted Successfuly',
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
        'apartmentId': this.user.id,
        'image': this.data['image'],
        'title': this.data['title'],
        'description': this.description,
        'startDate': this.data['startDate'],
        'endDate': this.data['endDate'],
      }
      resolve(body);
    });
  }

  insertAnnouncement(body:any): Promise<any>{
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

  setSelection(): Promise<any>{
    return new Promise<any> (resolve => {
      let desc = document.querySelectorAll(".description");
      this.range = document.createRange();
      this.range.setStart(desc[0], 0);
      this.sel = document.getSelection();
      this.sel.removeAllRanges();
      this.sel.addRange(this.range);
      resolve(true);
    })
  }
}
