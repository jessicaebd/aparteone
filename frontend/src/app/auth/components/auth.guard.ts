import { inject } from "@angular/core";
import { AppService } from "src/app/app.service";

export const authGuard = async () => {
    const appService = inject(AppService);

    if (!appService.retrieveAccessToken()) {
        window.location.replace('/login');
    }
}
