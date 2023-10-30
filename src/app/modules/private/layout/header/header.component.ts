import { Component } from '@angular/core';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService
    ) { }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
   this.loginService.logout();
  }

}
