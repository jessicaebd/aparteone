import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Product } from '../merchant.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  user = this.appService.retrieveUser();
  flagValidasi: boolean = false;
  @Input() data: Product = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  updateProduct(id:any, isActive:any, body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.updateProduct(id, isActive, body).subscribe({
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
  
  onButtonClick(value:any){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.data['image']=="" || this.data['image']==undefined){
      errorMsg = "Please Upload Product Image";
    }
    else if(this.data['name']=="" || this.data['name']=="Type a value" || this.data['name']==undefined){
      errorMsg = "Please Fill Product Name";
    }
    else if(this.data['description']=="" || this.data['description']=="Type a value" || this.data['description']==undefined){
      errorMsg = "Please Fill Product Description";
    }
    else if(this.data['price']=="" || this.data['price'] < 0 || this.data['price']==undefined){
      errorMsg = "Please Fill Product Price";
    }
    else{
      this.flagValidasi = true
    }
    
    console.log(this.data);

    if(this.flagValidasi){
      //SUBMIT REQUEST
      Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: "#697988",
        confirmButtonColor: "#5025FA",
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.apps.loadingPage(true);
          this.submitRequest(value);
        }
      });
    }
    else{
      Swal.fire({
        title: 'Validasi',
        html: errorMsg,
        icon: 'warning',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setInsertBodyProduct(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'merchantId': this.user.id,
        'image': this.data['image'],
        'name': this.data['name'],
        'price': this.data['price'],
        'description': this.data['description']
      }
      resolve(body);
    });
  }

  async submitRequest(value:any){
    let body = await this.setInsertBodyProduct();
    let result = await this.updateProduct(this.data['id'], value, body);
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
        html: 'Failed Update Product',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
