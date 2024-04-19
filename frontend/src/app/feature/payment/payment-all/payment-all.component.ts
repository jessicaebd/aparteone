import { Component, ViewChild } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { AppComponent } from 'src/app/app.component';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { Payment } from '../payment.interface';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-payment-all',
  templateUrl: './payment-all.component.html',
  styleUrls: ['./payment-all.component.css']
})
export class PaymentAllComponent {
  role: string = 'management';
  apartmentId = 1;

  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest?: string;
  page = 0;
  colRequest: Column[] = [];
  dataRequest: Payment = {};

  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(PaymentAddComponent) paymentAdd!: PaymentAddComponent;

  constructor(private paymentService: PaymentService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'mailboxCategory', displayName: 'Category'}, {name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'receivedDate', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.getPaymentDetailApartment(this.apartmentId, 10, this.page);
    }
    else if (this.role=='resident'){
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getPaymentDetailApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.paymentService.getPaymentDetailApartment(apartmentId, size, page).subscribe({
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
      // this.dataRequest['ID'] = response.id;
      // this.dataRequest['Resident Name'] = response.residentName;
      // this.dataRequest['Resident ID'] = response.residentId;
      // this.dataRequest['Resident Unit'] = response.residentUnit;
      // this.dataRequest['Mailbox ID'] = response.mailboxId;
      // this.dataRequest['Mailbox Category'] = response.mailboxCategory;
      // this.dataRequest['Mailbox Desc'] = response.description;
      // this.dataRequest['Status'] = response.status;
      // this.dataRequest['Received Date'] = response.receivedDate;
      // this.dataRequest['Completed Date'] = response.completedDate;
      resolve(this.dataRequest);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.getPaymentDetailApartment(this.apartmentId, 10, this.page);
  }
  
  onCloseModal(type: string){
    if(type=='detail'){
      this.modalCloseDetail.nativeElement.click();
    }
    else if(type=='new'){
      this.modalCloseNew.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  onAddPayment(){
    this.paymentAdd.ngOnInit();
  }

  backButton(){
    window.location.replace('payment');
  }
}
