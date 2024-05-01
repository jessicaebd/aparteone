import { Component, NgModule, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MaintenanceAllRequestComponent } from '../maintenance/maintenance-all-request/maintenance-all-request.component';
import { FacilityAllRequestComponent } from '../facility/facility-all-request/facility-all-request.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  user = this.appService.retrieveUser();
  html = '';
  isGuest = false;
  latestRequest: string = 'maintenance';

  flagPayment: boolean = true;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;

  constructor(private apps: AppComponent, private appService: AppService){  }

  ngOnInit(){
    
  }

  goToFeaturePage(e:any){
    window.location.replace('/' + e);
  }

  showLatestRequest(f:string) {
    this.latestRequest = f;
  }
}
