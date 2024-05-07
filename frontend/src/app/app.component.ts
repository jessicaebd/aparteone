import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './app.service';
import { AuthComponent } from './auth/components/auth.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { environment } from 'src/environments/development';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthComponent]
})
export class AppComponent implements OnInit {
  title = 'aparteone';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  activeNav: string = 'home'
  isLogin = false;
  user!:any;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute, private idle: Idle, private keepalive: Keepalive, private spinner: NgxSpinnerService) {
    idle.setIdle(environment.renewSession.idle);
    idle.setTimeout(environment.renewSession.timeout);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Idle: No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      if (this.appService.retrieveAccessToken()) {
        this.idleState = 'Idle: Timed out!';
        this.timedOut = true;
        console.log(this.idleState);
        this.appService.clearLocalSession();
        alert("Timed out!");
        location.reload();
      } else {
        this.idleState = 'Idle: Not logged in.'
        console.log(this.idleState)
        this.idle.watch();
      }
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'Idle: You\'ve gone idle!'
      console.log(this.idleState);
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Idle: You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  ngOnInit(): void {
    if (this.appService.retrieveAccessToken()) {
      // this.isLogin = true;
      this.user = this.appService.retrieveUser();
    }
    let currentPath = window.location.href;

    if(currentPath.includes('billing')){
      this.activeNav = 'billing'
    }
    else if(currentPath.includes('facility')){
      this.activeNav = 'facility'
    }
    else if(currentPath.includes('maintenance')){
      this.activeNav = 'maintenance'
    }
    else if(currentPath.includes('mailbox')){
      this.activeNav = 'mailbox'
    }
    else if(currentPath.includes('report')){
      this.activeNav = 'report'
    }
    else if(currentPath.includes('announcement')){
      this.activeNav = 'announcement'
    }
    else if(currentPath.includes('merchant')){
      this.activeNav = 'merchant'
    }
    else if(currentPath.includes('chat')){
      this.activeNav = 'merchant'
    }
    else if(currentPath.includes('resident')){
      this.activeNav = 'resident'
    }
    else if(currentPath.includes('apartment')){
      this.activeNav = 'apartment'
    }
    else if(currentPath.includes('transaction')){
      this.activeNav = 'transaction'
    }
    else{
      this.activeNav = 'home'
    }
  }

  loadingPage(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      if(e){
        this.spinner.show();
        resolve(true);
      }
      else{
        setTimeout(() => {
          this.spinner.hide();
          resolve(true);
        }, 200);
      }
    })
  }

  goToLoginPage(){
    window.location.replace('/login');
  }

  logOut(): void {
    console.log('Log Out');
    this.isLogin = false;
    this.appService.deleteUser();
    this.router.navigateByUrl('login');
  }

  goToNotificationPage(){
    window.location.replace('/notification');
  }

  goToProfilePage(){
    window.location.replace('/profile');
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Idle: Started.';
    console.log(this.idleState);
    this.timedOut = false;
  }

  onNavbarActive(e:any){
    this.activeNav = e;
  }
}
