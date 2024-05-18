import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AdminService } from 'src/app/feature/admin/service/admin.service';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import Swal from 'sweetalert2';

export interface Register{
  name?:any;
  phone?:any;
  email?:any;
  password?:any;
  apartmentId?:any;
  apartmentUnitId?:any;
  image?:any;
  type?:any;
}

export interface Merchant{
  name?:any;
  phone?:any;
  email?:any;
  password?:any;
  apartmentId?:any;
  image?:any;
  bankAccount?:any;
  accountNumber?:any;
  accountName?:any;
  category?:any;
  address?:any;
}

export interface Apartement{
  name?:any;
  address?:any;
  province?:any;
  city?:any;
  postalCode?:any;
  phone?:any;
  email?:any;
  password?:any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: Register = { };
  apartment: Apartement = { };
  merchant: Merchant = { };

  apartmentList: listItems[] = [];
  unitList: listItems[] = [];
  typeResident: listItems[] = [{'code': 'Owner', 'value': 'Owner', 'selected': false}, {'code': 'Renter', 'value': 'Renter', 'selected': false}];
  categoryList: listItems[] = [{'code': 'Food & Beverage', 'value': 'Food and Beverage', 'selected': false}, {'code': 'Daily Needs', 'value': 'Daily Needs', 'selected': false}, {'code': 'Home Service', 'value': 'Home Service', 'selected': false}, {'code': 'Health & Beauty', 'value': 'Health and Beauty', 'selected': false}, {'code': 'Other', 'value': 'Other', 'selected': false}];
  flagApartement: boolean = false;
  flagMerchant: boolean = false;
  flagValidasi: boolean = false;
  invalid!: boolean;
  returnUrl!: string;
  params: any;

  constructor(
      private appService: AppService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private apps: AppComponent,
      private adminService: AdminService,
    ) {  }

  async ngOnInit() {
    if (this.appService.retrieveAccessToken()) {
        this.router.navigateByUrl('');
    }
    if(this.flagApartement==false){
      let data = await this.getApartmentList();
      await this.setDropdownApartment(data);
    }
  }

  goToLoginPage(): void {
    this.router.navigateByUrl('login');
  }

  onLogout(): void {
    this.appService.deleteUser();
    this.router.navigateByUrl('login');
  }

  onRegisterChange(e:any){
    this.apps.loadingPage(true);
    this.flagApartement = e;
    this.apps.loadingPage(false);
  }

  onMerchantChange(e:any){
    this.apps.loadingPage(true);
    this.flagMerchant = e;
    this.apps.loadingPage(false);
  }

  async onApartmentChange(e:any){
    this.register['apartmentId'] = e;
    if(e!=null && e!=undefined && e!='Select a Value'){
      let data = await this.getApartmentUnitList(e);
      this.setDropdownUnit(data);
    }
  }

  setDropdownApartment(data: any){
    this.apartmentList = [];
    for(let i=0; i<data.length; i++){
      this.apartmentList.push({
        'code': data[i].name,
        'value': data[i].id,
        'selected': false
      });
    }
  }

  setDropdownUnit(data: any){
    this.unitList = [];
    for(let i=0; i<data.length; i++){
      this.unitList.push({
        'code': data[i].unitNumber,
        'value': data[i].id,
        'selected': false
      });
    }
  }

  validateApartment(): Promise<any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.apartment.name=="" || this.apartment.name=="Type a value" || this.apartment.name==undefined){
        errorMsg = "Please fill Apartment Name";
      }
      else if(this.apartment.address=="" || this.apartment.address=="Type a value" || this.apartment.address==undefined){
        errorMsg = "Please fill Apartment Address";
      }
      else if(this.apartment.province=="" || this.apartment.province=="Type a value" || this.apartment.province==undefined){
        errorMsg = "Please fill Province";
      }
      else if(this.apartment.city=="" || this.apartment.city=="Type a value" || this.apartment.city==undefined){
        errorMsg = "Please fill City";
      }
      else if(this.apartment.postalCode=="" || this.apartment.postalCode=="Type a value" || this.apartment.postalCode==undefined){
        errorMsg = "Please fill Postal Code";
      }
      else if(this.apartment.phone=="" || this.apartment.phone=="Type a value" || this.apartment.phone==undefined){
        errorMsg = "Please fill Phone";
      }
      else if(this.apartment.email=="" || this.apartment.email=="Type a value" || this.apartment.email==undefined){
        errorMsg = "Please fill Email";
      }
      else if(this.apartment.password=="" || this.apartment.password=="Type a value" || this.apartment.password==undefined){
        errorMsg = "Please set Password";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg)
    })
  }

  validateResident(): Promise<any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.register.apartmentId=="" || this.register.apartmentId=="Select a value" || this.register.apartmentId==undefined){
        errorMsg = "Please choose Apartment Name";
      }
      else if(this.register.apartmentUnitId=="" || this.register.apartmentUnitId=="Select a value" || this.register.apartmentUnitId==undefined){
        errorMsg = "Please choose Apartment Unit";
      }
      else if(this.register.name=="" || this.register.name=="Select a value" || this.register.name==undefined){
        errorMsg = "Please fill Name";
      }
      else if(this.register.phone=="" || this.register.phone=="Type a value" || this.register.phone==undefined){
        errorMsg = "Please fill Phone";
      }
      else if(this.register.email=="" || this.register.email=="Type a value" || this.register.email==undefined){
        errorMsg = "Please fill Email";
      }
      else if(this.register.password=="" || this.register.password=="Type a value" || this.register.password==undefined){
        errorMsg = "Please set Password";
      }
      else if(this.register.type=="" || this.register.type=="Select a value" || this.register.type==undefined){
        errorMsg = "Please choose Type";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg)
    })
  }

  validateMerchant(): Promise<any>{
    return new Promise<any> (resolve => {
      let errorMsg = '';
      if(this.merchant.apartmentId=="" || this.merchant.apartmentId=="Select a value" || this.merchant.apartmentId==undefined){
        errorMsg = "Please choose Apartment Name";
      }
      else if(this.merchant.name=="" || this.merchant.name=="Select a value" || this.merchant.name==undefined){
        errorMsg = "Please fill Name";
      }
      else if(this.merchant.category=="" || this.merchant.category=="Select a value" || this.merchant.category==undefined){
        errorMsg = "Please choose Merchant Category";
      }
      else if(this.merchant.phone=="" || this.merchant.phone=="Type a value" || this.merchant.phone==undefined){
        errorMsg = "Please fill Phone";
      }
      else if(this.merchant.email=="" || this.merchant.email=="Type a value" || this.merchant.email==undefined){
        errorMsg = "Please fill Email";
      }
      else if(this.merchant.password=="" || this.merchant.password=="Type a value" || this.merchant.password==undefined){
        errorMsg = "Please set Password";
      }
      else{
        errorMsg = ''
      }
      resolve(errorMsg)
    })
  }

  async onRegisterSubmit(type:any){
    let errorMsg = '';
    if(type=='apartment'){
      console.log(this.apartment);
      errorMsg = await this.validateApartment();
    }
    else if (type=='resident'){
      console.log(this.register);
      errorMsg = await this.validateResident();
    }
    else {
      console.log(this.merchant);
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
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.apps.loadingPage(true);
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
    let result;
    if(type=='apartment'){
      let body = await this.setBodyInsertApartment();
      result = await this.registerApartment(body);
      this.apartment = { };
    }
    else if (type=='resident'){
      let body = await this.setBodyInsertResident();
      result = await this.registerResident(body);
      this.register = {};
    }
    else if (type=='merchant'){
      let body = await this.setBodyInsertMerchant();
      result = await this.registerMerchant(body);
      this.register = {};
    }
    this.apps.loadingPage(false);
    this.goToLoginPage();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Register Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Register',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyInsertApartment(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'email': this.apartment.email,
        'phone': this.apartment.phone,
        'password': this.apartment.password,
        'name': this.apartment.name,
        'address': this.apartment.address,
        'province': this.apartment.province,
        'city': this.apartment.city,
        'postalCode': this.apartment.postalCode
      }
      resolve(body);
    });
  }

  setBodyInsertResident(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'email': this.register.email,
        'phone': this.register.phone,
        'password': this.register.password,
        'name': this.register.name,
        'apartmentId': this.register.apartmentId,
        'apartmentUnitId': this.register.apartmentUnitId,
        'type': this.register.type,
      }
      resolve(body);
    });
  }

  setBodyInsertMerchant(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'email': this.merchant.email,
        'phone': this.merchant.phone,
        'password': this.merchant.password,
        'name': this.merchant.name,
        'apartmentId': this.merchant.apartmentId,
        'bankAccount': this.merchant.bankAccount,
        'accountNumber': this.merchant.accountNumber,
        'accountName': this.merchant.accountName,
        'category': this.merchant.category,
        'address': this.merchant.address,
      }
      resolve(body);
    });
  }

  getApartmentList(): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getActiveApartmentList().subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(response.data);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }

  getApartmentUnitList(id:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentUnitList(id, 1000, 0).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(response.data);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }

  registerApartment(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.authService.registerApartment(body).subscribe({
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

  registerResident(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.authService.registerResident(body).subscribe({
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

  registerMerchant(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.authService.registerMerchant(body).subscribe({
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
}
