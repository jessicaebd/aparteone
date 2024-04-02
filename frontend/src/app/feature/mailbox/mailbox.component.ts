import { Component } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent {
  filter: any = "";

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  backButton(){
    window.location.replace('/');
  }
}
