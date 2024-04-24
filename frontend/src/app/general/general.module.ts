import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeatureModule } from './../feature/feature.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ChartPageComponent } from './library/chart-page/chart-page.component';
import { LibraryPageComponent } from './library/library-page/library-page.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LibraryPageComponent,
    ChartPageComponent,
    RegisterComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FeatureModule,
    ReactiveFormsModule,
    RouterModule,
    NgxEditorModule,
  ],
  exports: [
    LibraryPageComponent,
    ChartPageComponent,
    RegisterComponent,
    NotificationComponent,
  ],
  providers:[]
})

export class GeneralModule { }