import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance-category',
  templateUrl: './maintenance-category.component.html',
  styleUrls: ['./maintenance-category.component.css']
})
export class MaintenanceCategoryComponent {
  
  onCategoryClick(){
    window.location.replace('/maintenance/request');
  }
}
