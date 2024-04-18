import { Component, ViewChild } from '@angular/core';
import { MailboxService } from '../service/mailbox.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { MailboxAddComponent } from '../mailbox-add/mailbox-add.component';
import { Mailbox } from '../mailbox.interface';

@Component({
  selector: 'app-mailbox-all',
  templateUrl: './mailbox-all.component.html',
  styleUrls: ['./mailbox-all.component.css']
})
export class MailboxAllComponent {
  role: string = 'management';
  apartmentId = 1;

  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest?: string;
  page = 0;
  colRequest: Column[] = [];
  dataRequest: Mailbox = {};

  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(MailboxAddComponent) mailboxAdd!: MailboxAddComponent;

  constructor(private mailboxService: MailboxService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'mailboxCategory', displayName: 'Category'}, {name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'receivedDate', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.getMailboxDetailApartment(this.apartmentId, 10, this.page);
    }
    else if (this.role=='resident'){
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

  async onListItemClick(e:any){
    console.log('OnList:', e);
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident Name'] = response.residentName;
      this.dataRequest['Resident ID'] = response.residentId;
      this.dataRequest['Resident Unit'] = response.residentUnit;
      this.dataRequest['Mailbox ID'] = response.mailboxId;
      this.dataRequest['Mailbox Category'] = response.mailboxCategory;
      this.dataRequest['Mailbox Desc'] = response.description;
      this.dataRequest['Status'] = response.status;
      this.dataRequest['Received Date'] = response.receivedDate;
      this.dataRequest['Completed Date'] = response.completedDate;
      resolve(this.dataRequest);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.getMailboxDetailApartment(this.apartmentId, 10, this.page);
  }

  // async onSortData(e:any){
  //   console.log("OnSort: ", e);
  //   this.page = 0;
  //   let arr = await this.onSplitSortEvent(e);
  //   console.log(arr);
  //   this.getMailboxDetailApartment(this.apartmentId, 10, this.page);
  // }

  // onSplitSortEvent(e:any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     let arr = e.split(";", 2); 
  //     this.sortReqCol = arr[0];
  //     this.sortReqDir = arr[1];
  //     resolve(arr);
  //   });
  // }
  
  onCloseModal(type: string){
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
