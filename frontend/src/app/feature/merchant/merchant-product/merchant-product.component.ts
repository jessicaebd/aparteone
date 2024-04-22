import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Cart, Product } from '../merchant.interface';
import Swal from 'sweetalert2';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-merchant-product',
  templateUrl: './merchant-product.component.html',
  styleUrls: ['./merchant-product.component.css']
})
export class MerchantProductComponent {
  @Input() productCard?: Product[];
  @Output() onSubmitEvent = new EventEmitter<any>;

  keySearch?: string;
  filter: any = "";
  productOpen!: any;
  counterProduct = 0;
  dataCart: Cart = {};
  flagValidasi?: boolean = false;

  @ViewChild('closeModal') modalClose: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit() {
    // this.data = {};
    // this.mailboxCategory = [];
    // this.setDropdown(category);
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";
    console.log(this.dataCart);

    if(this.dataCart['quantity'] < 0 || this.dataCart['quantity']==null || this.dataCart['quantity']==undefined){
      errorMsg = "Please input Order Quantity";
    }
    else{
      this.flagValidasi = true
    }

    if(this.flagValidasi){
      //SUBMIT REQUEST
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
          this.submitRequest();
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
  
  async submitRequest(){
    let body = await this.setBodyAddToCart();
    let result = await this.addToCart(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Inserted Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Insert Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyAddToCart(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        // 'residentId': this.residentId,s
      }
      resolve(body);
    });
  }

  addToCart(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.addToCart(body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }

  saveOrder(productId: any, amount: any){
    console.log(productId, amount);

    this.modalClose.nativeElement.click();
  }

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  onSearchData(){
    console.log(this.keySearch);
  }

  onProductClick(item: any){
    console.log(item);
    this.productOpen = item;
    // this.activeCategory = id;
    // this.maintenanceRequest.initRequestMaintenance(this.activeCategory);
  }
}
