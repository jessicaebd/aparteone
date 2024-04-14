import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { ButtonComponent } from './component/button/button.component';
import { TextboxComponent } from './component/textbox/textbox.component';
import { LabelComponent } from './component/label/label.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { RoundedContainerComponent } from './component/rounded-container/rounded-container.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { TextareaComponent } from './component/textarea/textarea.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { DynamicTextboxComponent } from './component/dynamic-textbox/dynamic-textbox.component';
import { DynamicTextareaComponent } from './component/dynamic-textarea/dynamic-textarea.component';
import { CheckboxListComponent } from './component/checkbox-list/checkbox-list.component';
import { AttachmentComponent } from './component/attachment/attachment.component';
import { TableComponent } from './component/table/table.component';
import { TextButtonComponent } from './component/text-button/text-button.component';
import { ModalComponent } from './component/modal/modal.component';
import { SwitchComponent } from './component/switch/switch.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from './component/chart/chart.component';
import { RadioButtonComponent } from './component/radio-button/radio-button.component';
import { RangeComponent } from './component/range/range.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AlertComponent } from './component/alert/alert.component';
import { PickerComponent } from './component/picker/picker.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { AttachmentImageComponent } from './component/attachment-image/attachment-image.component';
import { BadgeComponent } from './component/badge/badge.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { TimepickerComponent } from './component/timepicker/timepicker.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TextboxComponent,
    LabelComponent,
    RoundedContainerComponent,
    CheckboxComponent,
    TextareaComponent,
    DatepickerComponent,
    DynamicTextboxComponent,
    DynamicTextareaComponent,
    AttachmentComponent,
    TableComponent,
    TextButtonComponent,
    ModalComponent,
    SwitchComponent,
    ChartComponent,
    RangeComponent,
    BreadcrumbComponent,
    AlertComponent,
    PickerComponent,
    AccordionComponent,
    AttachmentImageComponent,
    BadgeComponent,
    AddItemComponent,
    TimepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    DropdownComponent,
    CheckboxListComponent,
    RadioButtonComponent,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [
    ButtonComponent,
    TextboxComponent,
    TextareaComponent,
    LabelComponent,
    DropdownComponent,
    RoundedContainerComponent,
    CheckboxComponent,
    DatepickerComponent,
    DynamicTextboxComponent,
    DynamicTextareaComponent,
    CheckboxListComponent,
    RadioButtonComponent,
    AttachmentComponent,
    TableComponent,
    TextButtonComponent,
    ModalComponent,
    SwitchComponent,
    ChartComponent,
    RangeComponent,
    BreadcrumbComponent,
    AlertComponent,
    PickerComponent,
    AccordionComponent,
    AttachmentImageComponent,
    BadgeComponent,
    AddItemComponent,
    TimepickerComponent,
  ],
  providers:[]
})

export class SharedModule { }