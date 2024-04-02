import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MAINTENANCE
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceCategoryComponent } from './maintenance/maintenance-category/maintenance-category.component';
import { MaintenanceRequestComponent } from './maintenance/maintenance-request/maintenance-request.component';
import { MaintenanceHistoryComponent } from './maintenance/maintenance-history/maintenance-history.component';
import { MaintenanceAddCategoryComponent } from './maintenance/maintenance-add-category/maintenance-add-category.component';
import { MaintenanceAllRequestComponent } from './maintenance/maintenance-all-request/maintenance-all-request.component';
// FACILITY
import { FacilityComponent } from './facility/facility.component';
import { FacilityListComponent } from './facility/facility-list/facility-list.component';
import { FacilityCategoryComponent } from './facility/facility-category/facility-category.component';
import { FacilityRequestComponent } from './facility/facility-request/facility-request.component';
import { FacilityHistoryComponent } from './facility/facility-history/facility-history.component';
import { FacilityAddCategoryComponent } from './facility/facility-add-category/facility-add-category.component';
import { FacilityAllRequestComponent } from './facility/facility-all-request/facility-all-request.component';
// ANNOUNCEMENT
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail.component';
// MAILBOX
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxListComponent } from './mailbox/mailbox-list/mailbox-list.component';
// PAYMENT
import { PaymentComponent } from './payment/payment.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceCategoryComponent,
    MaintenanceRequestComponent,
    MaintenanceHistoryComponent,
    MaintenanceAddCategoryComponent,
    MaintenanceAllRequestComponent,
    FacilityComponent,
    FacilityListComponent,
    FacilityCategoryComponent,
    FacilityRequestComponent,
    FacilityHistoryComponent,
    FacilityAddCategoryComponent,
    FacilityAllRequestComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    MailboxComponent,
    MailboxListComponent,
    PaymentComponent,
    PaymentListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceCategoryComponent,
    MaintenanceRequestComponent,
    MaintenanceHistoryComponent,
    MaintenanceAddCategoryComponent,
    MaintenanceAllRequestComponent,
    FacilityComponent,
    FacilityListComponent,
    FacilityCategoryComponent,
    FacilityRequestComponent,
    FacilityHistoryComponent,
    FacilityAddCategoryComponent,
    FacilityAllRequestComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    MailboxComponent,
    MailboxListComponent,
    PaymentComponent,
    PaymentListComponent,
  ],
  providers:[]
})

export class FeatureModule { }