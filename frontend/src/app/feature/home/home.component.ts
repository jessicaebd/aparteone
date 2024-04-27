import { Component, NgModule, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MaintenanceAllRequestComponent } from '../maintenance/maintenance-all-request/maintenance-all-request.component';
import { FacilityAllRequestComponent } from '../facility/facility-all-request/facility-all-request.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  role: string = 'resident';
  html = '';
  isGuest = false;
  latestRequest: string = 'maintenance';

  flagPayment: boolean = true;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;

  constructor(private apps: AppComponent){  }

  ngOnInit(){
    this.role = this.apps.getUserRole();
  }

  goToFeaturePage(e:any){
    window.location.replace('/' + e);
  }

  showLatestRequest(f:string) {
    this.latestRequest = f;
  }
}
