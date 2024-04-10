import { Component, ViewChild } from '@angular/core';
import { FacilityRequestComponent } from '../facility-request/facility-request.component';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'app-facility-category',
  templateUrl: './facility-category.component.html',
  styleUrls: ['./facility-category.component.css']
})
export class FacilityCategoryComponent {

  facilityCategory!: any;
  activeCategory!: any;

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(FacilityRequestComponent) maintenanceRequest!: FacilityRequestComponent;

  constructor(private facilityService: FacilityService){}

  ngOnInit(): void {
    // this.getMaintenanceCategory();
  }

  // getMaintenanceCategory(): Promise<any>{
  //   return new Promise<any>(resolve => 
  //     this.facilityService.getMaintenanceAllCategory(1).subscribe({
  //       next: async (response: any) => {
  //         console.log('Response: ', response);
  //         this.facilityCategory = response;
  //       },
  //       error: (error: any) => {
  //         console.log('#error', error);
  //         resolve(error);
  //       }
  //     }))
  // }

  onCloseModal(){
    this.modalClose.nativeElement.click();
  }

  onCategoryClick(id: any){
    this.activeCategory = id;
    // this.facilityRequest.initRequestMaintenance(this.activeCategory);
  }
}
