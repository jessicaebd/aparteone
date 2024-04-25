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
      this.activeCategory['id'] = response.id;
      this.activeCategory['apartmentId'] = response.apartmentId;
      this.activeCategory['category'] = response.category;
      this.activeCategory['description'] = response.description;
      this.activeCategory['image'] = response.image;
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

  onCategoryClick(response: any){
    this.setDetailCategory(response);
    this.facilityRequest.getFacilityTime(response.id, '9999-99-99');
  }
}
