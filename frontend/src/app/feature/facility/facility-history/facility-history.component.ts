import { Component } from '@angular/core';

@Component({
  selector: 'app-facility-history',
  templateUrl: './facility-history.component.html',
  styleUrls: ['./facility-history.component.css']
})
export class FacilityHistoryComponent {
  filter: any = "";

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  backButton(){
    window.location.replace('/facility');
  }
}
