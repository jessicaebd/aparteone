import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingComponent } from './features/billing/billing.component';
import { FacilityComponent } from './features/facility/facility.component';
import { HomeComponent } from './features/home/home.component';
import { MailboxComponent } from './features/mailbox/mailbox.component';
import { MaintenanceComponent } from './features/maintenance/maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    BillingComponent,
    FacilityComponent,
    MailboxComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
