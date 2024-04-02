import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  filter: any = "";

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  backButton(){
    window.location.replace('/');
  }
}
