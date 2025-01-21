import { Component, HostListener } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yoni-das-pretas';
  constructor(
    private authService: AuthService
    ) { }

 /* @HostListener('window:beforeunload', ['$event'])  
  unloadNotification($event: any): void{
    this.authService.clearStorage();
    this.authService.logged.next(false);
  }*/
}
