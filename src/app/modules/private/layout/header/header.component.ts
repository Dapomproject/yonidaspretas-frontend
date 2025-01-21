import { Component, HostListener } from '@angular/core';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService,
    private authService: AuthService
    ) { }

  @HostListener('window:beforeunload', ['$event'])  
  unloadNotification($event: any): void{
    this.authService.clearStorage();
    this.authService.logged.next(false);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
   this.loginService.logout();
  }

}
