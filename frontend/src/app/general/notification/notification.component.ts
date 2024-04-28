import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  residentId = 4;
  data!: any;
  errorMsg: string = '';

  constructor(private appService: AppService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    await this.getMailboxCategory(this.residentId);
    this.apps.loadingPage(false);
  }

  getMailboxCategory(userId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.getNotifications(userId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.data = response;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          this.data = null;
          resolve(error);
        }
      }))
  }

  backButton(){
    window.location.replace('/');
  }
}
