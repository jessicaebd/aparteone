import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiMerchant = `${environment.modules.feature.merchant}`;
  private apiProduct = `${environment.modules.feature.product}`;
  private apiCart = `${environment.modules.feature.cart}`;
  private apiSearch = `${environment.modules.general.search}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiDelete = `${environment.modules.general.delete}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // MERCHANT
  getMerchantResident(apartmentId: any, category:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}`;
    const headers = new HttpHeaders({
    });
    let params;
    if(category!=''){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'category': category } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMerchantApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMerchantResident(apartmentId: any, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}`;
    const headers = new HttpHeaders({
    });
    let params;
    if(search!=''){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'search': search } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMerchantApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiSearch}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  // PRODUCT
  getProductResident(merchantId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiProduct}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getProductMerchant(merchantId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiProduct}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getProductDetail(productId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiProduct}/${this.apiDetail}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'productId': productId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  // CART
  getCart(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertCart(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiAdd}`;
    return this.httpClient.post<any>(apiUrl, body);
  }
  
  updateCart(cartId:any, quantity:any, notes:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiUpdate}`;
    const params = new HttpParams({ fromObject: { 'cartId': cartId, 'quantity': quantity, 'notes': notes } });
    const options = { params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  deleteCart(cartId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiDelete}`;
    const params = new HttpParams({ fromObject: { 'cartId': cartId } });
    const options = { params };
    return this.httpClient.delete<any>(apiUrl, options);
  }

  // TRANSACTION
  // getMailboxDetailApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
  //   const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiDetail}/${this.apiApartment}`;
  //   const headers = new HttpHeaders({
  //   });
  //   const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
  //   const options = { headers, params };
  //   return this.httpClient.get<any>(apiUrl, options);
  // }

  // getMailboxDetailResident(residentId: any, size:number, page: number, status: any): any {
  //   const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiDetail}/${this.apiResident}`;
  //   const headers = new HttpHeaders({
  //   });
  //   let params;
  //   if(status!='' || status != null){
  //     params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
  //   }
  //   else{
  //     params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page } });
  //   }
  //   const options = { headers, params };
  //   return this.httpClient.get<any>(apiUrl, options);
  // }

  // insertMailboxDetail(body:any): any {
  //   const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiDetail}`;
  //   return this.httpClient.post<any>(apiUrl, body);
  // }

  // updateMailboxDetail(mailboxRequestId:any, status:any): any {
  //   const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiDetail}/${this.apiUpdate}-status`;
  //   const params = new HttpParams({ fromObject: { 'mailboxRequestId': mailboxRequestId, 'status': status } });
  //   const options = { params };
  //   const body = { };
  //   return this.httpClient.post<any>(apiUrl, body, options);
  // }
}
