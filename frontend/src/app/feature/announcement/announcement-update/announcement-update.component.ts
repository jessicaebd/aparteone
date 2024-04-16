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
  description!: any;
  range!: any;
  sel!: any;

  constructor(private announcementService: AnnouncementService, private apps: AppComponent){}

  async onInitView(data: any){
    this.apps.loadingPage(true);
    this.data = await this.setData(data);
    await this.setSelection();
    setTimeout(()=>{
      document.execCommand('insertHTML', false, this.data.description);
      this.apps.loadingPage(false);
    }, 1000);
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

  setData(data:any): Promise<any>{
    return new Promise<any> (resolve => {
      let result: Announcement = {
        'id': data.id,
        'apartmentId': data.apartment_id,
        'image': data.image,
        'title': data.title,
        'description': data.description,
        'startDate': this.formatISODate(new Date(data.startDate)),
        'endDate': this.formatISODate(new Date(data.endDate)),
        'status': data.status
      }
      resolve(result);
    })
  }

  formatISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
    let body = await this.setBodyUpdateAnnouncement();
    let result = await this.updateAnnouncement(body);
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

  setBodyUpdateAnnouncement(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'image': this.data['image'],
        'title': this.data['title'],
        'description': this.description,
        'startDate': this.data['startDate'],
        'endDate': this.data['endDate'],
      }
      resolve(body);
    });
  }

  updateAnnouncement(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.updateAnnouncement(this.data.id, body).subscribe({
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

  // getMonth(monthStr: string){
  //   return new Date(monthStr+'-1-01').getMonth();
  // }

  // toDate(dateStr: string) {
  //   let parts: string[] = dateStr.split("-", 3);
  //   let year = parts[2].split(' ', 2);
  //   let mon = this.getMonth(parts[1]);
  //   return new Date(Number(year[0]), mon, Number(parts[0]))
  // }
}

