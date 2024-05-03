import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
// MAINTENANCE
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceCategoryComponent } from './maintenance/maintenance-category/maintenance-category.component';
import { MaintenanceRequestComponent } from './maintenance/maintenance-request/maintenance-request.component';
import { MaintenanceHistoryComponent } from './maintenance/maintenance-history/maintenance-history.component';
import { MaintenanceAddCategoryComponent } from './maintenance/maintenance-add-category/maintenance-add-category.component';
import { MaintenanceAllRequestComponent } from './maintenance/maintenance-all-request/maintenance-all-request.component';
import { MaintenanceDetailRequestComponent } from './maintenance/maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceUpdateCategoryComponent } from './maintenance/maintenance-update-category/maintenance-update-category.component';
// FACILITY
import { FacilityComponent } from './facility/facility.component';
import { FacilityListComponent } from './facility/facility-list/facility-list.component';
import { FacilityCategoryComponent } from './facility/facility-category/facility-category.component';
import { FacilityRequestComponent } from './facility/facility-request/facility-request.component';
import { FacilityHistoryComponent } from './facility/facility-history/facility-history.component';
import { FacilityAddCategoryComponent } from './facility/facility-add-category/facility-add-category.component';
import { FacilityAllRequestComponent } from './facility/facility-all-request/facility-all-request.component';
import { FacilityUpdateCategoryComponent } from './facility/facility-update-category/facility-update-category.component';
import { FacilityDetailRequestComponent } from './facility/facility-detail-request/facility-detail-request.component';
// ANNOUNCEMENT
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail.component';
import { AnnouncementAddComponent } from './announcement/announcement-add/announcement-add.component';
import { AnnouncementUpdateComponent } from './announcement/announcement-update/announcement-update.component';
// MAILBOX
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxListComponent } from './mailbox/mailbox-list/mailbox-list.component';
import { MailboxAddCategoryComponent } from './mailbox/mailbox-add-category/mailbox-add-category.component';
import { MailboxUpdateCategoryComponent } from './mailbox/mailbox-update-category/mailbox-update-category.component';
import { MailboxAllComponent } from './mailbox/mailbox-all/mailbox-all.component';
import { MailboxAddComponent } from './mailbox/mailbox-add/mailbox-add.component';
import { MailboxDetailComponent } from './mailbox/mailbox-detail/mailbox-detail.component';
// PAYMENT
import { BillingComponent } from './billing/billing.component';
import { BillingAddComponent } from './billing/billing-add/billing-add.component';
import { BillingAddCategoryComponent } from './billing/billing-add-category/billing-add-category.component';
import { BillingAllComponent } from './billing/billing-all/billing-all.component';
import { BillingDetailComponent } from './billing/billing-detail/billing-detail.component';
import { BillingListComponent } from './billing/billing-list/billing-list.component';
import { BillingPayComponent } from './billing/billing-pay/billing-pay.component';
import { BillingUpdateCategoryComponent } from './billing/billing-update-category/billing-update-category.component';
// CHAT
import { ChatComponent } from './chat/chat.component';
// MERCHANT
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantAllComponent } from './merchant/merchant-all/merchant-all.component';
import { MerchantHistoryComponent } from './merchant/merchant-history/merchant-history.component';
import { MerchantListComponent } from './merchant/merchant-list/merchant-list.component';
import { MerchantProductComponent } from './merchant/merchant-product/merchant-product.component';
import { MerchantStoreComponent } from './merchant/merchant-store/merchant-store.component';
import { ProductAllComponent } from './merchant/product-all/product-all.component';
import { MerchantDetailComponent } from './merchant/merchant-detail/merchant-detail.component';
import { ProductDetailComponent } from './merchant/product-detail/product-detail.component';
import { ProductAddComponent } from './merchant/product-add/product-add.component';
import { CartComponent } from './merchant/cart/cart.component';
import { TransactionComponent } from './merchant/transaction/transaction.component';
import { TransactionListComponent } from './merchant/transaction-list/transaction-list.component';
// REPORT
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { TransactionDetailComponent } from './merchant/transaction-detail/transaction-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductListComponent } from './merchant/product-list/product-list.component';

// ADMIN
import { ResidentComponent } from './admin/resident/resident.component';
import { ResidentDetailComponent } from './admin/resident-detail/resident-detail.component';
import { ApartmentDetailComponent } from './admin/apartment-detail/apartment-detail.component';
import { ApartmentComponent } from './admin/apartment/apartment.component';
import { UnitDetailComponent } from './admin/unit-detail/unit-detail.component';
import { UnitAddComponent } from './admin/unit-add/unit-add.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './register/register.component';
import { ApartmentNeedApprovalComponent } from './admin/apartment-need-approval/apartment-need-approval.component';
import { CheckoutComponent } from './merchant/checkout/checkout.component';
import { ResidentNeedApprovalComponent } from './admin/resident-need-approval/resident-need-approval.component';
import { MerchantNeedApprovalComponent } from './admin/merchant-need-approval/merchant-need-approval.component';
import { BillingVerifyComponent } from './billing/billing-verify/billing-verify.component';
import { FacilityUpcomingComponent } from './facility/facility-upcoming/facility-upcoming.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceCategoryComponent,
    MaintenanceRequestComponent,
    MaintenanceHistoryComponent,
    MaintenanceAddCategoryComponent,
    MaintenanceAllRequestComponent,
    MaintenanceDetailRequestComponent,
    MaintenanceUpdateCategoryComponent,
    FacilityComponent,
    FacilityListComponent,
    FacilityCategoryComponent,
    FacilityRequestComponent,
    FacilityHistoryComponent,
    FacilityAddCategoryComponent,
    FacilityAllRequestComponent,
    FacilityUpdateCategoryComponent,
    FacilityDetailRequestComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    AnnouncementAddComponent,
    AnnouncementUpdateComponent,
    MailboxComponent,
    MailboxListComponent,
    MailboxAddCategoryComponent,
    MailboxUpdateCategoryComponent,
    MailboxAllComponent,
    MailboxAddComponent,
    MailboxDetailComponent,
    MerchantComponent,
    MerchantAllComponent,
    MerchantListComponent,
    MerchantHistoryComponent,
    MerchantProductComponent,
    MerchantStoreComponent,
    MerchantDetailComponent,
    ProductAllComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductListComponent,
    CartComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    ReportComponent,
    ChatComponent,
    HomeComponent,
    TransactionComponent,
    BillingComponent,
    BillingAddComponent,
    BillingAddCategoryComponent,
    BillingAllComponent,
    BillingDetailComponent,
    BillingListComponent,
    BillingPayComponent,
    BillingUpdateCategoryComponent,
    ProfileComponent,
    ResidentComponent,
    ResidentDetailComponent,
    ApartmentDetailComponent,
    ApartmentComponent,
    UnitDetailComponent,
    UnitAddComponent,
    NotificationComponent,
    RegisterComponent,
    ApartmentNeedApprovalComponent,
    CheckoutComponent,
    ResidentNeedApprovalComponent,
    MerchantNeedApprovalComponent,
    BillingVerifyComponent,
    FacilityUpcomingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatPaginatorModule,
  ],
  exports: [
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceCategoryComponent,
    MaintenanceRequestComponent,
    MaintenanceHistoryComponent,
    MaintenanceAddCategoryComponent,
    MaintenanceAllRequestComponent,
    MaintenanceDetailRequestComponent,
    MaintenanceUpdateCategoryComponent,
    FacilityComponent,
    FacilityListComponent,
    FacilityCategoryComponent,
    FacilityRequestComponent,
    FacilityHistoryComponent,
    FacilityAddCategoryComponent,
    FacilityAllRequestComponent,
    FacilityUpdateCategoryComponent,
    FacilityDetailRequestComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    AnnouncementAddComponent,
    AnnouncementUpdateComponent,
    MailboxComponent,
    MailboxListComponent,
    MailboxAddCategoryComponent,
    MailboxUpdateCategoryComponent,
    MailboxAllComponent,
    MailboxAddComponent,
    MailboxDetailComponent,
    MerchantComponent,
    MerchantAllComponent,
    MerchantListComponent,
    MerchantHistoryComponent,
    MerchantStoreComponent,
    MerchantDetailComponent,
    ProductAllComponent,
    ProductDetailComponent,
    ProductAddComponent,
    CartComponent,
    TransactionListComponent,
    ReportComponent,
    ChatComponent,
    HomeComponent,
    TransactionComponent,
    BillingComponent,
    BillingAddComponent,
    BillingAddCategoryComponent,
    BillingAllComponent,
    BillingDetailComponent,
    BillingListComponent,
    BillingPayComponent,
    BillingUpdateCategoryComponent,
    ProfileComponent,
    ResidentComponent,
    ResidentDetailComponent,
    ApartmentDetailComponent,
    ApartmentComponent,
    NotificationComponent,
    RegisterComponent,
    ApartmentNeedApprovalComponent,
    CheckoutComponent,
  ],
  providers:[]
})

export class FeatureModule { }