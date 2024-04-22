import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Merchant } from '../merchant.interface';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent {
  flagValidasi: boolean = false;
  @Input() data: Merchant = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  updateMerchantStatus(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.updateMerchantStatus(id, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  approveMerchant(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.approveMerchant(id, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }
  
  onButtonClick(type: any, value:any){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        this.submitRequest(type, value);
      }
    });
  }

  async submitRequest(type:any, value:any){
    let result;
    if(type=='approve'){
      result = await this.approveMerchant(this.data['id'], value);
    }
    else{
      result = await this.updateMerchantStatus(this.data['id'], value);
    }
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Update Merchant',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
