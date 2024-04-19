import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FacilityCategory } from '../facility.interface';
import { FacilityRequestComponent } from '../facility-request/facility-request.component';

@Component({
  selector: 'app-facility-category',
  templateUrl: './facility-category.component.html',
  styleUrls: ['./facility-category.component.css']
})
export class FacilityCategoryComponent {

  @Input() listCategory!: any;
  @Input() errorMsg!: string;
  activeCategory: FacilityCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(FacilityRequestComponent) facilityRequest!: FacilityRequestComponent;

  constructor(){}

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.activeCategory['ID'] = response.id;
      this.activeCategory['Apartment ID'] = response.apartmentId;
      this.activeCategory['Category Name'] = response.category;
      this.activeCategory['Category Desc'] = response.description;
      this.activeCategory['Category Image'] = response.image;
      this.activeCategory['Status'] = response.isActive;
      this.activeCategory['Created Date'] = response.createdDate;
      this.activeCategory['Modified Date'] = response.modifiedDate;
      resolve(this.activeCategory);
    });
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.onSubmitEvent.emit();
  }

  onCategoryClick(response: any){
    this.setDetailCategory(response);
    this.facilityRequest.getFacilityTime(response.id, '9999-99-99');
  }
}
