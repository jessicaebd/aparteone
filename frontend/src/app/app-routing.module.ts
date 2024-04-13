import { HomeComponent } from './general/home/home.component';
import { ChartPageComponent } from './general/library/chart-page/chart-page.component';
import { LibraryPageComponent } from './general/library/library-page/library-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';
import { authGuard } from './auth/components/auth.guard';
import { RegisterComponent } from './general/register/register.component';

// ANNOUNCEMENT
import { AnnouncementDetailComponent } from './feature/announcement/announcement-detail/announcement-detail.component';

// PAYMENT
import { PaymentComponent } from './feature/payment/payment.component';

// MAINTENANCE
import { MaintenanceComponent } from './feature/maintenance/maintenance.component';
import { MaintenanceAllRequestComponent } from './feature/maintenance/maintenance-all-request/maintenance-all-request.component';
import { MaintenanceDetailRequestComponent } from './feature/maintenance/maintenance-detail-request/maintenance-detail-request.component';

// FACILITY
import { FacilityComponent } from './feature/facility/facility.component';
import { FacilityRequestComponent } from './feature/facility/facility-request/facility-request.component';
import { MaintenanceHistoryComponent } from './feature/maintenance/maintenance-history/maintenance-history.component';
import { FacilityHistoryComponent } from './feature/facility/facility-history/facility-history.component';
import { FacilityAddCategoryComponent } from './feature/facility/facility-add-category/facility-add-category.component';
import { FacilityAllRequestComponent } from './feature/facility/facility-all-request/facility-all-request.component';

// MAILBOX
import { MailboxComponent } from './feature/mailbox/mailbox.component';

// CHAT
import { ChatComponent } from './feature/chat/chat.component';

// MERCHANT
import { MerchantComponent } from './feature/merchant/merchant.component';
import { MerchantHistoryComponent } from './feature/merchant/merchant-history/merchant-history.component';
import { MerchantStoreComponent } from './feature/merchant/merchant-store/merchant-store.component';

// REPORT
import { ReportComponent } from './feature/report/report.component';
import { NotificationComponent } from './general/notification/notification.component';
import { AnnouncementComponent } from './feature/announcement/announcement.component';

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
  { path: 'payment', component: PaymentComponent },
  
  // MAINTENANCE
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'maintenance/history', component: MaintenanceHistoryComponent  },
  { path: 'maintenance/list', component: MaintenanceAllRequestComponent  },
  { path: 'maintenance/detail', component: MaintenanceDetailRequestComponent  },
  
  // FACILITY
  { path: 'facility', component: FacilityComponent },
  { path: 'facility/request', component: FacilityRequestComponent  },
  { path: 'facility/history', component: FacilityHistoryComponent  },
  { path: 'facility/add', component: FacilityAddCategoryComponent  },
  { path: 'facility/list', component: FacilityAllRequestComponent  },
  
  // MAILBOX
  { path: 'mailbox', component: MailboxComponent },

  // MERCHANT
  { path: 'merchant', component: MerchantComponent },
  { path: 'merchant/store/:id', component: MerchantStoreComponent  },
  { path: 'merchant/history', component: MerchantHistoryComponent  },
  
  // MERCHANT
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
