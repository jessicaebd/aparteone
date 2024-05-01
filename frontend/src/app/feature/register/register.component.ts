import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

export interface Register{
  name?:any;
  email?:any;
  password?:any;
  code?:any;
}

export interface Apartement{
  name?:any;
  address?:any;
  province?:any;
  city?:any;
  postalCode?:any;
  email?:any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: Register = {
    name: '',
    email: '',
    password: '',
    code: '',
  };
  apartement: Apartement = {
    name: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    email: ''
  };
  flagApartement: boolean = false;
  invalid!: boolean;
  returnUrl!: string;
  params: any;

  constructor(
      private appService: AppService,
      private router: Router,
      private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    if (this.appService.retrieveAccessToken()) {
        this.router.navigateByUrl('');
    }
    const { returnUrl, params } = this.route.snapshot.queryParams;
    if (returnUrl) this.returnUrl = returnUrl;
    if (params) this.params = JSON.parse(params);
  }

  onRegisterSubmit(){
    if(this.flagApartement){
      console.log(this.apartement);
    }
    else{
      console.log(this.register);
    }
  }

  onLogout(): void {
    this.appService.deleteUser();
    this.router.navigateByUrl('login');
  }
}
