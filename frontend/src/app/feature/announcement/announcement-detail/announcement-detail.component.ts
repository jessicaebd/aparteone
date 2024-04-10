import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit{
  isManagement: boolean = true
  id: any = null;

  @ViewChild('closeModal') modalClose: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    console.log('AnnoucementID: ', this.id);
    console.log(this.id);
  }

  backButton(){
    window.location.replace('/');
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
  }
}
