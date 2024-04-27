import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../merchant.interface';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  merchantId: number = 9;
  // @Input() merchantId!: number;
  @Output() onSubmitEvent = new EventEmitter<any>();

  allDataProduct: any;
  productList: Product[] = [];
  keySearch?: string;
  filter: any = '';
  productOpen!: any;
  counterProduct = 1;

  page: number = 0;
  size: number = 10;
  errorMsgProduct: string = '';

  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(
    private merchantService: MerchantService,
    private apps: AppComponent
  ) {}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgProduct = '';
    await this.getProductList(this.merchantId, this.size, this.page);
    console.log(this.productList);
    this.apps.loadingPage(false);
  }

  getProductList(merchantId: any, size:number, page:number): Promise<any> {
    return new Promise<any>((resolve) =>
      this.merchantService.getProductMerchant(merchantId,size,page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if (response.data.length > 0) {
            this.productList = response.data;
            this.allDataProduct = response.totalElements;
          } else {
            this.errorMsgProduct = 'No Data Found!';
            this.productList = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgProduct = 'No Data Found!';
          this.productList = [];
          resolve(error);
        },
      })
    );
  }

  onProductClick(item: any) {
    this.productOpen = item;
  }

  redirect(type: any) {
    if (type == 'detail') {
      this.modalCloseDetail.nativeElement.click();
    }
    this.ngOnInit();
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
  }

}
