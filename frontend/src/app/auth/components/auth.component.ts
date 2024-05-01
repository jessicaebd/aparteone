import { AppService } from './../../app.service';
import { LoginResponse } from './../models/auth.model';
import { ResponseSchema } from './../../shared/models/general.model';
import { AuthService } from './../service/auth.service';
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

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
              this.appService.saveUser(response);
            },
            error: (error: any) => {
              console.log('#error', error);
              resolve(error);
            }
          })
        )
    }

    logger(){
        console.log(this.appService.retrieveAccessToken());
        console.log(this.appService.retrieveUser());
    }
      
    async onLoginSubmit(){
        console.log(this.email, ' | ', this.password);
        await this.login(this.email, this.password);
        this.router.navigateByUrl('');
    }

    onLogout(): void {
        this.appService.deleteUser();
        this.router.navigateByUrl('login');
    }
}