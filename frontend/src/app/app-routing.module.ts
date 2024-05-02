import { HomeComponent } from './feature/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';
import { authGuard } from './auth/components/auth.guard';
import { RegisterComponent } from './feature/register/register.component';

// ANNOUNCEMENT
import { AnnouncementComponent } from './feature/announcement/announcement.component';
import { AnnouncementDetailComponent } from './feature/announcement/announcement-detail/announcement-detail.component';

// PAYMENT
import { BillingComponent } from './feature/billing/billing.component';
import { BillingAllComponent } from './feature/billing/billing-all/billing-all.component';

// MAINTENANCE
import { MaintenanceComponent } from './feature/maintenance/maintenance.component';
import { MaintenanceHistoryComponent } from './feature/maintenance/maintenance-history/maintenance-history.component';
import { MaintenanceAllRequestComponent } from './feature/maintenance/maintenance-all-request/maintenance-all-request.component';

// FACILITY
import { FacilityComponent } from './feature/facility/facility.component';
import { FacilityHistoryComponent } from './feature/facility/facility-history/facility-history.component';
import { FacilityAllRequestComponent } from './feature/facility/facility-all-request/facility-all-request.component';

// MAILBOX
import { MailboxComponent } from './feature/mailbox/mailbox.component';
import { MailboxAllComponent } from './feature/mailbox/mailbox-all/mailbox-all.component';

// CHAT
import { ChatComponent } from './feature/chat/chat.component';

// MERCHANT
import { MerchantComponent } from './feature/merchant/merchant.component';
import { MerchantHistoryComponent } from './feature/merchant/merchant-history/merchant-history.component';
import { MerchantStoreComponent } from './feature/merchant/merchant-store/merchant-store.component';
import { MerchantAllComponent } from './feature/merchant/merchant-all/merchant-all.component';
import { ProductAllComponent } from './feature/merchant/product-all/product-all.component';
import { CartComponent } from './feature/merchant/cart/cart.component';
import { TransactionComponent } from './feature/merchant/transaction/transaction.component';

// REPORT
import { ReportComponent } from './feature/report/report.component';

// PROFILE
import { ProfileComponent } from './feature/profile/profile.component';
import { ResidentComponent } from './feature/admin/resident/resident.component';
import { ApartmentComponent } from './feature/admin/apartment/apartment.component';
import { CheckoutComponent } from './feature/merchant/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'report', component: ReportComponent, canActivate: [authGuard] },
  
  // ANNOUNCEMENT
  { path: 'announcement', component: AnnouncementComponent, canActivate: [authGuard] },
  { path: 'announcement/detail/:id', component: AnnouncementDetailComponent, canActivate: [authGuard] },
  
  // PAYMENT
  { path: 'billing', component: BillingComponent, canActivate: [authGuard] },
  { path: 'billing/all', component: BillingAllComponent, canActivate: [authGuard] },
  
  // MAINTENANCE
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [authGuard] },
  { path: 'maintenance/history', component: MaintenanceHistoryComponent, canActivate: [authGuard]  },
  { path: 'maintenance/all', component: MaintenanceAllRequestComponent, canActivate: [authGuard]  },
  
  // FACILITY
  { path: 'facility', component: FacilityComponent, canActivate: [authGuard] },
  { path: 'facility/history', component: FacilityHistoryComponent, canActivate: [authGuard]  },
  { path: 'facility/all', component: FacilityAllRequestComponent, canActivate: [authGuard]  },
  
  // MAILBOX
  { path: 'mailbox', component: MailboxComponent, canActivate: [authGuard] },
  { path: 'mailbox/all', component: MailboxAllComponent, canActivate: [authGuard] },

  // MERCHANT
  { path: 'merchant', component: MerchantComponent },
  { path: 'merchant/all', component: MerchantAllComponent  },
  { path: 'merchant/store/:id', component: MerchantStoreComponent  },
  { path: 'merchant/history', component: MerchantHistoryComponent  },
  { path: 'product', component: ProductAllComponent  },
  { path: 'cart/:id', component: CartComponent },
  { path: 'transaction', component: TransactionComponent  },
  { path: 'checkout/:id', component: CheckoutComponent  },
  
  // CHAT
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [authGuard]  },

  // ADMIN
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'resident', component: ResidentComponent, canActivate: [authGuard] },
  { path: 'apartment', component: ApartmentComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
