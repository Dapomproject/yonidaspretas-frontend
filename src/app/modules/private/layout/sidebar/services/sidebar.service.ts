import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = true;

  private toggleBehaviorSubject = new BehaviorSubject<boolean>(true);

  constructor() { }

  toggleSidebar(): void {
    this.toggled = !this.toggled;
    this.toggleBehaviorSubject.next(this.toggled);
  }

  getToggle(): any {
    return this.toggleBehaviorSubject;
  }
}
