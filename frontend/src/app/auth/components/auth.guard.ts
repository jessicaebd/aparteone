import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { AuthService } from "../service/auth.service";

export const authGuard = async () => {
    let now = new Date();
    const router = inject(Router);
    const appService = inject(AppService);
    const authService = inject(AuthService);
    let responseToken: any;

    if (appService.retrieveAccessToken()) {
        let accessExpiredIn = new Date(appService.retrieveAccessTokenExpiredIn());
        if (now >= accessExpiredIn) {
            responseToken = await authRefreshToken(responseToken, authService, appService);
            if (responseToken.access_token) {
                return true;
            } else {
                navigateToLogin(router);
                return false;
            }
        } else {
            return true;
        }
    } else {
        navigateToLogin(router);
        return false;
    }
}

async function authRefreshToken(responseToken: any, authService: AuthService, appService: AppService) {
    console.log('refreshing token!');
    responseToken = await new Promise<any>(resolve => authService.refreshToken().subscribe({
        next: (response: any) => {
            const result = response.output_schema.output_data;
            console.log(response);
            appService.clearLocalSession();
            appService.saveUser(result);
            resolve(result);
        },
        error: (error: any) => {
            console.log('#error', error);
            const { error_schema } = error.error;
            alert("Session expired! " + error_schema.error_message.english);
            appService.clearLocalSession();
            resolve(error);
        }
    }));
    return responseToken;
}

function navigateToLogin(router: Router) {
    const nav = router.getCurrentNavigation();

    let redirect_link = ``;
    let redirect_params = ``;
    if (nav) {
        redirect_link = `${window.location.pathname}`;
        const params = nav.extractedUrl.queryParams;

        if (params) redirect_params = JSON.stringify(params);
    }
    router.navigate(['login'], { queryParams: { returnUrl: `${redirect_link}`, params: redirect_params } });
}
