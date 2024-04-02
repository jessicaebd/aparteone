import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartPageComponent } from './library/chart-page/chart-page.component';
import { LibraryPageComponent } from './library/library-page/library-page.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    LibraryPageComponent,
    ChartPageComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    NgxEditorModule,
  ],
  exports: [
    LibraryPageComponent,
    ChartPageComponent,
    HomeComponent,
  ],
  providers:[]
})

export class GeneralModule { }