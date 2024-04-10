import { AppService } from './../../app.service';
import { LoginResponse } from './../models/auth.model';
import { ResponseSchema } from './../../shared/models/general.model';
import { AuthService } from './../service/auth.service';
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    username!: string;
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

    onLoginSubmit(){
        // window.open("/");
        console.log(this.username, ' | ', this.password);
        // (document.getElementById("loginButton") as HTMLButtonElement).disabled = true;
        
        // let userId = form.value.user_id;
        // const password = form.value.password;
        // if (userId.indexOf('\\') > -1){
        //     let udomain = userId.split('\\');
        //     userId = udomain[1];
        // }

        // this.authService.login(userId, password).subscribe({
        //     next: (response: ResponseSchema<LoginResponse>) => {
        //         const result = response.output_schema.output_data;
        //         console.log(response);
        //         this.appService.saveUser(result);
        //         if (!this.returnUrl) this.router.navigateByUrl('');
        //         else this.router.navigate([this.returnUrl], { queryParams: this.params });
        //     }, error: (error: any) => {
        //         console.log('#error', error);
        //         const { error_schema } = error.error;
        //         alert("Login failed: " + error_schema.error_message.english);
        //         (document.getElementById("loginButton") as HTMLButtonElement).disabled = false;
        //     }
        // });
    }

    onLogout(): void {
        this.appService.deleteUser();
        this.router.navigateByUrl('login');
    }
}