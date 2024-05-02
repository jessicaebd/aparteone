import { Component, ViewChild } from '@angular/core';
import { MailboxService } from '../service/mailbox.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { MailboxAddComponent } from '../mailbox-add/mailbox-add.component';
import { Mailbox } from '../mailbox.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-mailbox-all',
  templateUrl: './mailbox-all.component.html',
  styleUrls: ['./mailbox-all.component.css']
})
export class MailboxAllComponent {
  user = this.appService.retrieveUser();

  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest?: string;
  keySearch: string = '';
  page = 0;
  colRequest: Column[] = [];
  dataRequest: Mailbox = {};

  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(MailboxAddComponent) mailboxAdd!: MailboxAddComponent;

  constructor(private mailboxService: MailboxService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgRequest = '';
    if(this.user.role=='Management'){
      this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'mailboxCategory', displayName: 'Category'}, {name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'receivedDate', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getMailboxDetailApartment(this.user.id, 10, this.page);
      }
      else{
        await this.searchMailboxDetailApartment(this.user.id, 10, this.page, this.keySearch);
      }
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getMailboxDetailApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxDetailApartment(apartmentId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
          }
          else{
            this.errorMsgRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgRequest = 'No Data Found!'
          this.tableRequest = null;
          resolve(error);
        }
      }))
  }

  searchMailboxDetailApartment(apartmentId: any, size:number, page: number, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.searchMailboxDetailApartment(apartmentId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
          }
          else{
            this.errorMsgRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgRequest = 'No Data Found!'
          this.tableRequest = null;
          resolve(error);
        }
      }))
  }

  async onListItemClick(e:any){
    console.log('OnList:', e);
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['id'] = response.id;
      this.dataRequest['receiptId'] = response.receiptId;
      this.dataRequest['residentId'] = response.residentId;
      this.dataRequest['residentName'] = response.residentName;
      this.dataRequest['residentUnit'] = response.residentUnit;
      this.dataRequest['mailboxId'] = response.mailboxId;
      this.dataRequest['mailboxCategory'] = response.mailboxCategory;
      this.dataRequest['description'] = response.description;
      this.dataRequest['status'] = response.status;
      this.dataRequest['receivedDate'] = response.receivedDate;
      this.dataRequest['completedDate'] = response.completedDate;
      resolve(this.dataRequest);
    });
  }

  onSearchData(key:any){
    this.keySearch = key;
    this.page = 0;
    this.ngOnInit();
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.getMailboxDetailApartment(this.user.id, 10, this.page);
  }
  
  redirect(type: string){
    if(type=='detail'){
      this.modalCloseDetail.nativeElement.click();
    }
    else if(type=='new'){
      this.modalCloseNew.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  onAddMailbox(){
    this.mailboxAdd.ngOnInit();
  }

  backButton(){
    window.location.replace('mailbox');
  }
}
