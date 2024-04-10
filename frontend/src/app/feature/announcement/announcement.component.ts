import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent{
  isManagement: boolean = true;

  @ViewChild('closeModal') modalClose: any;

  onCloseModal(){
    this.modalClose.nativeElement.click();
  }
}
