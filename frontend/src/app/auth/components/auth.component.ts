import { AppService } from './../../app.service';
import { LoginResponse } from './../models/auth.model';
import { ResponseSchema } from './../../shared/models/general.model';
import { AuthService } from './../service/auth.service';
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    email!: string;
    password!: any;
    invalid!: boolean;
    returnUrl!: string;
    params: any;

    constructor(
        private authService: AuthService,
        private appService: AppService,
        private apps: AppComponent,
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


    login(email:any, password:any): Promise<any>{
      return new Promise<any>(resolve => 
        this.authService.login(email, password).subscribe({
          next: async (response: any) => {
            console.log('Response: ', response);
            if(response.statusCode!='401'){
              await this.appService.saveUser(response);
            }
            else {
              Swal.fire({
                title: 'Error',
                html: 'Invalid Username or Password',
                icon: 'error',
                confirmButtonColor: '#5025FA'
              });
            }
            resolve(true);
          },
          error: (error: any) => {
            console.log('#error', error);
            Swal.fire({
              title: 'Error',
              html: 'Login Error',
              icon: 'error',
              confirmButtonColor: '#5025FA'
            });
            resolve(error);
          }
        })
      )
    }
      
    async onLoginSubmit(){
      this.apps.loadingPage(true);
      await this.login(this.email, this.password);
      this.router.navigateByUrl('');
      this.apps.ngOnInit();
      this.apps.loadingPage(false);
    }
}