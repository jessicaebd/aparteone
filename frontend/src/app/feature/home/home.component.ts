import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role: string = 'resident';
  html = '';
  isGuest = false;

  flagPayment: boolean = false;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;
  flagBills: boolean = true;

  constructor(private apps: AppComponent){  }

  ngOnInit(){
    this.role = this.apps.getUserRole();
  }

  onCategoryInformation(e:any){
    window.location.replace('/' + e);
  }
}
