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
      this.activeCategory['ID'] = response.id;
      this.activeCategory['Apartment ID'] = response.apartmentId;
      this.activeCategory['Category Name'] = response.category;
      this.activeCategory['Category Desc'] = response.description;
      this.activeCategory['Category Image'] = response.image;
      this.activeCategory['Status'] = response.isActive? 'Active': 'In-Active';
      this.activeCategory['Created Date'] = response.createdDate;
      this.activeCategory['Modified Date'] = response.modifiedDate;
      resolve(this.activeCategory);
    });
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.onSubmitEvent.emit();
  }
  
  onCategoryClick(item: any){
    this.setDetailCategory(item);
  }
}
