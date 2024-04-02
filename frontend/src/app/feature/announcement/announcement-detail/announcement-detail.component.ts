import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit{
  id: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
  }

  backButton(){
    window.location.replace('/');
  }
}
