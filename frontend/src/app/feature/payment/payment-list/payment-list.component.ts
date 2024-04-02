import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {

  onPayClick(e:any){
    console.log('Open Payment');
  }

  onDownloadPDF(e:any){
    console.log('Download PDF');
  }

}
