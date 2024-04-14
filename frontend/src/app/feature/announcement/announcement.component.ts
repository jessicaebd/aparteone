import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from './service/announcement.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit{
  @Input() role!: string;

  tableAnnouncement: any;
  allDataAnnouncement: any;
  sortAnnCol?: string = 'id';
  sortAnnDir?: string = 'DESC';
  colAnnouncement: Column[] = [];
  listAnnouncement!: any;
  errorMsglist: string = "";

  @ViewChild('closeModal') modalClose: any;

  constructor(private announcementService: AnnouncementService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.role = this.apps.getUserRole();
    // let currentPath = window.location.href;
    // if(currentPath.includes('announcement')){
    //   this.role = 'management'
    // }

    if(this.role=='resident'){
      await this.getListAnnouncement(2, 1000, 0, 'id', 'ASC', 'Active');
    }
    else if(this.role=='management'){
      this.colAnnouncement = [{name: 'title', displayName: 'Title'}, {name: 'start_date', displayName: 'Start Date'}, {name: 'end_date', displayName: 'End Date'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      await this.getListAnnouncement(1, 10, 0, this.sortAnnCol, this.sortAnnDir, null);
    }
    this.apps.loadingPage(false);
  }

  getListAnnouncement(apartementId:any, size:any, page:any, sortBy: any, sortDir:any, criteria: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.announcementService.getListAnnouncement(apartementId, size, page, sortBy, sortDir, criteria).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            if(this.role=='resident'){
              this.listAnnouncement = response.data;
            }
            else if(this.role=='management'){
              this.tableAnnouncement = response.data;
            }
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

  async onListItemClick(type: string, e:any){
    window.location.replace('/announcement/detail/' + e.id);
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    this.getListAnnouncement(1, 10, e, this.sortAnnCol, this.sortAnnDir, null);
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(e);
    console.log(arr);
    this.getListAnnouncement(1, 10, 0, this.sortAnnCol, this.sortAnnDir, null);
  }

  onSplitSortEvent(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arr = e.split(";", 2); 
      this.sortAnnCol = arr[0];
      this.sortAnnDir = arr[1];
      resolve(arr);
    });
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }
}
