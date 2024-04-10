import { Component } from '@angular/core';

@Component({
  selector: 'app-merchant-history',
  templateUrl: './merchant-history.component.html',
  styleUrls: ['./merchant-history.component.css']
})
export class MerchantHistoryComponent {
  filter: any = "";

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  backButton(){
    window.location.replace('/merchant');
  }
}
