import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MaintenanceCategory } from '../maintenance.interface';

@Component({
  selector: 'app-maintenance-category',
  templateUrl: './maintenance-category.component.html',
  styleUrls: ['./maintenance-category.component.css']
})
export class MaintenanceCategoryComponent{
  @Input() listCategory!: any;
  @Input() errorMsg!: string;
  activeCategory: MaintenanceCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  @ViewChild('closeModal') modalClose: any;

  constructor(){}

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.activeCategory['id'] = response.id;
      this.activeCategory['apartmentId'] = response.apartmentId;
      this.activeCategory['image'] = response.image;
      this.activeCategory['category'] = response.category;
      this.activeCategory['description'] = response.description;
      this.activeCategory['isActive'] = response.isActive;
      this.activeCategory['createdDate'] = response.createdDate;
      this.activeCategory['modifiedDate'] = response.modifiedDate;
      resolve(this.activeCategory);
    });
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.onSubmitEvent.emit();
  }
  
  onCategoryClick(item: any){
    this.setDetailCategory(item);
  }
}
