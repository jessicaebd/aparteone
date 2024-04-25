import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../service/announcement.service';
import { Announcement } from '../announcement.interface';
import { AppComponent } from 'src/app/app.component';
import { AnnouncementUpdateComponent } from '../announcement-update/announcement-update.component';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit{
  role!: string;
  id: any = null;
  errorMsg: string = "";
  announcement!: Announcement;

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(AnnouncementUpdateComponent) updateAnnouncement!: AnnouncementUpdateComponent;

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService, private apps: AppComponent) { }

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.role = this.apps.getUserRole();
    this.id = this.route.snapshot.params['id'];
    await this.getDetailAnnouncement(this.id);
    document.querySelectorAll('.paragraf')[0].innerHTML = this.announcement.description;
    this.apps.loadingPage(false);
  }

  getDetailAnnouncement(announcementId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.getDetailAnnouncement(announcementId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.announcement = response
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  initViewUpdate(data:any){
    this.updateAnnouncement.onInitView(data);
  }

  backButton(){
    if(this.role == 'management'){
      window.location.replace('announcement');
    }
    else{
      window.location.replace('/');
    }
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }
}
