import { Component } from '@angular/core';

@Component({
  selector: 'app-facility-category',
  templateUrl: './facility-category.component.html',
  styleUrls: ['./facility-category.component.css']
})
export class FacilityCategoryComponent {

  onCategoryClick(){
    window.location.replace('/facility/request');
  }
}
