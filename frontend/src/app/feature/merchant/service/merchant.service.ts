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
  private apiTransaction = `${environment.modules.feature.transaction}`;
  private apiPayment = `${environment.modules.feature.paymentProof}`;
  private apiCheckout = `${environment.modules.feature.checkout}`;
  private apiSearch = `${environment.modules.general.search}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiDelete = `${environment.modules.general.delete}`;
  private apiVerify = `${environment.modules.general.verify}`;
  private apiApprove = `${environment.modules.general.approve}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // MERCHANT
  getMerchantResident(apartmentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': true, 'size': 100, 'sortBy': 'name', 'sortDir': 'ASC' } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMerchantApartment(apartmentId: any, size:number, page: number, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(apartmentId==null || apartmentId==''){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'isApproved': isApproved } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'isApproved': isApproved } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMerchantApartment(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(search!='' && apartmentId==null){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'search': search, 'sortBy': 'name', 'sortDir': 'ASC' } });
    }
    else if(search=='' && apartmentId==null){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'sortBy': 'name', 'sortDir': 'ASC' } });
    }
    else if(search!='' && apartmentId!=null){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search, 'sortBy': 'name', 'sortDir': 'ASC' } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': 'name', 'sortDir': 'ASC' } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMerchantResident(apartmentId: any, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(search!=''){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'search': search, 'size': 100, 'sortBy': 'name', 'sortDir': 'ASC', 'isActive': true } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': 100, 'sortBy': 'name', 'sortDir': 'ASC', 'isActive': true } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMerchantDetail(merchantId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  approveMerchant(merchantId:any, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiApprove}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'isApproved': isApproved } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateMerchantStatus(merchantId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiMerchant}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // PRODUCT
  getProductResident(merchantId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'size': 100 } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getProductMerchant(merchantId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchProductMerchant(merchantId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'size': size, 'page': page, 'search': search, 'sortBy': 'name', 'sortDir': 'ASC' } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchProductResident(merchantId: any, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'search': search, 'size': 100, 'sortBy': 'name', 'sortDir': 'ASC' } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getProductDetail(productId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'productId': productId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertProduct(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateProduct(productId:any, isActive:any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiProduct}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'productId': productId, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // CART
  getCartList(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getCartMerchant(residentId: any, merchantId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${residentId}/${merchantId}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.get<any>(apiUrl, options);
  }

  addToCart(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
  
  updateCart(cartId:any, quantity:any, notes:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(notes=='' || notes==null || notes==undefined){
      params = new HttpParams({ fromObject: { 'cartId': cartId, 'quantity': quantity } });
    }
    else{
      params = new HttpParams({ fromObject: { 'cartId': cartId, 'quantity': quantity, 'notes': notes } });
    }
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  deleteCart(cartId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiCart}/${this.apiDelete}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'cartId': cartId } });
    const options = { headers, params };
    return this.httpClient.delete<any>(apiUrl, options);
  }

  // TRANSACTION
  getTransactionMerchant(merchantId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiMerchant}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getTransactionResident(residentId: any, size:number, page: number, status:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(status=='' || status == null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page } });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getTransactionDetail(transactionId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'transactionId': transactionId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  updateTransactionStatus(transactionId:any, status:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'transactionId': transactionId, 'status': status } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  checkout(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiCheckout}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  payment(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiPayment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  verifyPayment(transactionId:any, isValid:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiTransaction}/${this.apiPayment}/${this.apiVerify}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'transactionId': transactionId, 'isValid': isValid } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

}
