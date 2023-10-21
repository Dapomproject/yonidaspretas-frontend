import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() menus: any[] | any;
  toggled: boolean | undefined;

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.sidebarService.getToggle().subscribe((value: any) => {
      this.toggled = value;
    });
   }

  ngOnInit(): void {
    if (this.router.url) {
      this.setStatusMenuByUrl(this.router.url);
    }
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.setStatusMenuByUrl(event);
    });
  }

  setStatusMenuByUrl(event: any): void {
    this.menus.map((m: any) => {
      if (m.levelTwo?.length > 0) {
        m.levelTwo.map((l2: any) => {
          if (l2.url === event.url || l2.url === event){
            m.active = true;
          }
        });
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleMenu(index: number): void {
    if (this.menus) {
      this.menus.filter(
        (menu: any, i: any) => i !== index && menu.active
      ).forEach((menu: any) => menu.active = !menu.active);

      this.menus[index].active = !this.menus[index].active;
    }
  }
}
