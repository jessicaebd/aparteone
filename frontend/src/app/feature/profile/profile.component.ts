import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  data!:any;
  categoryList: listItems[] = [{'code': 'Food & Beverage', 'value': 'Food and Beverage', 'selected': false}, {'code': 'Daily Needs', 'value': 'Daily Needs', 'selected': false}, {'code': 'Home Service', 'value': 'Home Service', 'selected': false}, {'code': 'Health & Beauty', 'value': 'Health and Beauty', 'selected': false}, {'code': 'Other', 'value': 'Other', 'selected': false}];
  user = this.appService.retrieveUser();

  constructor(private location: Location, private apps: AppComponent, private appService: AppService){}

  ngOnInit(): void {
    this.data = this.user;
    let obj = this.categoryList.findIndex(obj => obj.value == this.data.category);
    this.categoryList[obj].selected = true;
  }

  validateApartment(): Promise <any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.data['image']=="" || this.data['image']==undefined){
        errorMsg = "Please upload Profile Image";
      }
      else if(this.data['name']=="" || this.data['name']=="Type a value" || this.data['name']==undefined){
        errorMsg = "Please fill Apartment Name";
      }
      else if(this.data['address']=="" || this.data['address']=="Type a value" || this.data['address']==undefined){
        errorMsg = "Please fill Address";
      }
      else if(this.data['province']=="" || this.data['province']=="Type a value" || this.data['province']==undefined){
        errorMsg = "Please fill Province";
      }
      else if(this.data['city']=="" || this.data['city']=="Type a value" || this.data['city']==undefined){
        errorMsg = "Please fill City";
      }
      else if(this.data['postalCode']=="" || this.data['postalCode']=="Type a value" || this.data['postalCode']==undefined){
        errorMsg = "Please fill Postal Code";
      }
      else if(this.data['latitude']=="" || this.data['latitude']=="Type a value" || this.data['latitude']==undefined){
        errorMsg = "Please fill Latitude";
      }
      else if(this.data['longitude']=="" || this.data['longitude']=="Type a value" || this.data['longitude']==undefined){
        errorMsg = "Please fill Longitude";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg);
    })
  }

  validateResident(): Promise <any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.data['image']=="" || this.data['image']==undefined){
        errorMsg = "Please upload Profile Image";
      }
      else if(this.data['name']=="" || this.data['name']=="Type a value" || this.data['name']==undefined){
        errorMsg = "Please fill Name";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg);
    })
  }

  validateMerchant(): Promise <any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.data['image']=="" || this.data['image']==undefined){
        errorMsg = "Please upload Profile Image";
      }
      else if(this.data['name']=="" || this.data['name']=="Type a value" || this.data['name']==undefined){
        errorMsg = "Please fill Name";
      }
      else if(this.data['category']=="" || this.data['category']=="Select a value" || this.data['category']==undefined){
        errorMsg = "Please choose Category";
      }
      else if(this.data['bankAccount']=="" || this.data['bankAccount']=="Type a value" || this.data['bankAccount']==undefined){
        errorMsg = "Please fill Bank Account";
      }
      else if(this.data['accountNumber']=="" || this.data['accountNumber']=="Type a value" || this.data['accountNumber']==undefined){
        errorMsg = "Please fill Account Number";
      }
      else if(this.data['accountName']=="" || this.data['accountName']=="Type a value" || this.data['accountName']==undefined){
        errorMsg = "Please fill Account Name";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg);
    })
  }

  async onSaveClick(type:any){
    let errorMsg;
    if(type=='Resident'){
      errorMsg = await this.validateResident();
    }
    else if(type=='Management'){
      errorMsg = await this.validateApartment();
    }
    else if(type=='Merchant'){
      errorMsg = await this.validateMerchant();
    }
    
    if(errorMsg==''){
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
          this.submitRequest(type);
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

  async submitRequest(type:any){
    let body, result;
    if(type=='Resident'){
      body = await this.setBodyInsertResident();
      result = await this.updateResident(this.user.id, body);
    }
    else if(type=='Management'){
      body = await this.setBodyInsertApartment();
      result = await this.updateApartment(this.user.id, body);
    }
    else if(type=='Merchant'){
      body = await this.setBodyInsertMerchant();
      result = await this.updateMerchant(this.user.id, body);
    }
    this.apps.loadingPage(false);

    if(result){
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
      this.appService.updateUser(result);
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Update Profile',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyInsertResident(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'image': this.data['image'],
        'name': this.data['name'],
      }
      resolve(body);
    });
  }

  setBodyInsertApartment(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'image': this.data['image'],
        'name': this.data['name'],
        'address': this.data['address'],
        'province': this.data['province'],
        'city': this.data['city'],
        'postalCode': this.data['postalCode'],
        'latitude': this.data['latitude'],
        'longitude': this.data['longitude'],
      }
      resolve(body);
    });
  }

  setBodyInsertMerchant(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'image': this.data['image'],
        'name': this.data['name'],
        'bankAccount': this.data['bankAccount'],
        'accountNumber': this.data['accountNumber'],
        'accountName': this.data['accountName'],
        'address': this.data['address'],
        'category': this.data['category'],
      }
      resolve(body);
    });
  }

  updateResident(residentId:any, body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.updateResident(residentId, body).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }));
  }

  updateApartment(apartmentId:any, body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.updateApartment(apartmentId, body).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }));
  }

  updateMerchant(merchantId:any, body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.updateMerchant(merchantId, body).subscribe({
        next: async (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }));
  }

  backButton(){
    this.location.back();
  }
}
