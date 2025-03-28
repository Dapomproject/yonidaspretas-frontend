import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = true; // Variável que controla o estado atual da visibilidade da sidebar (inicialmente visível)

  // BehaviorSubject que mantém o estado da sidebar e emite mudanças
  private toggleBehaviorSubject = new BehaviorSubject<boolean>(true);

  constructor() { }

  // Método para alternar o estado da sidebar (visível/oculta)
  toggleSidebar(): void {
    this.toggled = !this.toggled; //Inverte o estado atual
    this.toggleBehaviorSubject.next(this.toggled); // Emite o novo estado para qualquer componente que esteja assinando
  }

  // Método para retornar o BehaviorSubject, permitindo que outros componentes observem o estado da sidebar
  getToggle(): any {
    return this.toggleBehaviorSubject; // Retorna o BehaviorSubject para que componentes possam se inscrever nas mudanças de estado
  }
}
