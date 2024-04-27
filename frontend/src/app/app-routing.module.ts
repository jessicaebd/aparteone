import { HomeComponent } from './feature/home/home.component';
import { ChartPageComponent } from './general/library/chart-page/chart-page.component';
import { LibraryPageComponent } from './general/library/library-page/library-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';
import { authGuard } from './auth/components/auth.guard';
import { RegisterComponent } from './general/register/register.component';

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
import { NotificationComponent } from './general/notification/notification.component';

// PROFILE
import { ProfileComponent } from './feature/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'library', component: LibraryPageComponent  },
  { path: 'chart', component: ChartPageComponent  },
  { path: 'report', component: ReportComponent },
  { path: 'notification', component: NotificationComponent },
  
  // ANNOUNCEMENT
  { path: 'announcement', component: AnnouncementComponent},
  { path: 'announcement/detail/:id', component: AnnouncementDetailComponent},
  
  // PAYMENT
  { path: 'billing', component: BillingComponent },
  { path: 'billing/all', component: BillingAllComponent},
  
  // MAINTENANCE
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'maintenance/history', component: MaintenanceHistoryComponent  },
  { path: 'maintenance/all', component: MaintenanceAllRequestComponent  },
  
  // FACILITY
  { path: 'facility', component: FacilityComponent },
  { path: 'facility/history', component: FacilityHistoryComponent  },
  { path: 'facility/all', component: FacilityAllRequestComponent  },
  
  // MAILBOX
  { path: 'mailbox', component: MailboxComponent },
  { path: 'mailbox/all', component: MailboxAllComponent },

  // MERCHANT
  { path: 'merchant', component: MerchantComponent },
  { path: 'merchant/all', component: MerchantAllComponent  },
  { path: 'merchant/store/:id', component: MerchantStoreComponent  },
  { path: 'merchant/history', component: MerchantHistoryComponent  },
  { path: 'product', component: ProductAllComponent  },
  { path: 'cart/:id', component: CartComponent },
  { path: 'transaction', component: TransactionComponent  },
  
  // CHAT
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
