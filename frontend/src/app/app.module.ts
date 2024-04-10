import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GeneralModule } from './general/general.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/components/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from "ngx-webstorage";
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { FeatureModule } from './feature/feature.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        GeneralModule,
        FeatureModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        ReactiveFormsModule
    ]
})
export class AppModule { }
