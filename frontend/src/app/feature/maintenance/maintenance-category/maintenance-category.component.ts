import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintenanceService } from '../service/maintenance.service';
import { MaintenanceRequestComponent } from '../maintenance-request/maintenance-request.component';

@Component({
  selector: 'app-maintenance-category',
  templateUrl: './maintenance-category.component.html',
  styleUrls: ['./maintenance-category.component.css']
})
export class MaintenanceCategoryComponent implements OnInit{

  maintenanceCategory!: any;
  activeCategory!: any;

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(MaintenanceRequestComponent) maintenanceRequest!: MaintenanceRequestComponent

  constructor(private maintenanceService: MaintenanceService){}

  ngOnInit(): void {
    this.getMaintenanceCategory();
  }

  getMaintenanceCategory(): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllCategory(1, 10, 0).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.maintenanceCategory = response;
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
  }
  
  onCategoryClick(id: any){
    this.activeCategory = id;
    this.maintenanceRequest.initRequestMaintenance(this.activeCategory);
  }
}
