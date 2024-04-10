import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent {
  isResident: boolean = true;
  isManagement: boolean = true;

  constructor(private location: Location){}

  onHistoryPage(){
    window.location.replace('/merchant/history');
  }

  backButton(){
    this.location.back();
  }
}
