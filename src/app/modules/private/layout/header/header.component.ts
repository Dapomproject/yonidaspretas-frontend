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
    private sidebarService: SidebarService, // Injeta o serviço SidebarService para manipular o menu lateral
    private loginService: LoginService, // Injeta o serviço LoginService para gerenciar o login e logout
    private authService: AuthService // Injeta o serviço AuthService para gerenciar autenticação e armazenamento
    ) { }

  // Define um ouvinte de evento para o evento de antes da página ser descarregada
  @HostListener('window:beforeunload', ['$event'])  
  unloadNotification($event: any): void{
    // Limpa os dados de autenticação e define o usuário como não logado
    this.authService.clearStorage();
    this.authService.logged.next(false);
  }

   // Método para alternar a visibilidade da barra lateral
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar(); // Chama o método toggleSidebar no SidebarService
  }

  // Método para fazer logout do sistema
  logout(): void {
   this.loginService.logout(); // Chama o método logout no LoginService
  }

}
