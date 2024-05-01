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
            navigateToLogin(router);
            return false;
        } else {
            return true;
        }
    } else {
        navigateToLogin(router);
        return false;
    }
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
