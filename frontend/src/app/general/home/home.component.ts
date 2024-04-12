import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  role!: string;
  html = '';

  flagPayment: boolean = true;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;

  constructor(private apps: AppComponent){  }

  ngOnInit(){
    this.role = this.apps.getUserRole();
  }

  onCategoryInformation(e:any){
    window.location.replace('/' + e);
  }
}
