import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from './service/announcement.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit{
  user = this.appService.retrieveUser();

  tableAnnouncement: any;
  allDataAnnouncement: any;
  sortAnnCol?: string = 'id';
  sortAnnDir?: string = 'DESC';
  errorMsg: string = "";
  page = 0;
  size = 10;
  colAnnouncement: Column[] = [];
  listAnnouncement!: any;
  errorMsglist: string = "";

  @ViewChild('closeModal') modalClose: any;

  constructor(private announcementService: AnnouncementService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = "";
    this.errorMsglist = "";

    if(this.user.role=='Resident' || this.user.role=='Merchant'){
      await this.getListAnnouncementResident(this.user.apartmentId, 'Active');
    }
    else if(this.user.role=='Management'){
      this.colAnnouncement = [{name: 'title', displayName: 'Title'}, {name: 'startDate', displayName: 'Start Date'}, {name: 'endDate', displayName: 'End Date'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      await this.getListAnnouncement(this.user.id, this.size, this.page, this.sortAnnCol, this.sortAnnDir);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getListAnnouncement(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.getListAnnouncement(apartementId, size, page, sortBy, sortDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
              this.tableAnnouncement = response.data;
              this.allDataAnnouncement = response.totalElements;
          }
          else{
            this.errorMsg = 'No Announcement!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Announcement!'
          resolve(error);
        }
      }))
  }

  getListAnnouncementResident(apartementId:any, criteria: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.getListAnnouncementResident(apartementId, criteria).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listAnnouncement = response.data;
          }
          else{
            this.errorMsglist = 'No Announcement!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsglist = 'No Announcement!'
          resolve(error);
        }
      }))
  }

  async goToDetailAnnouncementPage(type: string, e:any){
    window.location.replace('/announcement/detail/' + e.id);
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    await this.onSplitSortEvent(e);
    this.page = 0;
    this.ngOnInit();
  }

  onSplitSortEvent(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arr = e.split(";", 2); 
      this.sortAnnCol = arr[0];
      this.sortAnnDir = arr[1];
      resolve(arr);
    });
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }
}
