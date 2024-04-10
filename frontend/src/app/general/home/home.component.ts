import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isResident: boolean = false;
  isManagement: boolean = true;
  isAdmin: boolean = false;
  html = '';

  flagPayment: boolean = true;
  flagMailbox: boolean = false;
  flagFacility: boolean = true;

  constructor(){  }

  ngOnInit(){

  }

  onCategoryInformation(e:any){
    window.location.replace('/' + e);
  }
}
