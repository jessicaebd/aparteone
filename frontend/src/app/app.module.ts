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
import { MaintenanceRequestDetailComponent } from './features/maintenance/maintenance-request-detail/maintenance-request-detail.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MaintenanceRequestListComponent } from './features/maintenance/maintenance-request-list/maintenance-request-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    BillingComponent,
    FacilityComponent,
    MailboxComponent,
    HomeComponent,
    MaintenanceRequestDetailComponent,
    NavbarComponent,
    FooterComponent,
    MaintenanceRequestListComponent,
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
