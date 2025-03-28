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
  @Input() menus: any[] | any; // Recebe os menus como entrada (provavelmente de um componente pai)
  toggled: boolean | undefined; // Variável que controla o estado de visibilidade da sidebar

  constructor(private sidebarService: SidebarService, private router: Router) {
    // Assina o evento de toggle da sidebar vindo do SidebarService
    this.sidebarService.getToggle().subscribe((value: any) => {
      this.toggled = value; // Atualiza o estado da sidebar quando o serviço emite um valor
    });
   }

  ngOnInit(): void {
    // Verifica a URL inicial quando o componente é carregado
    if (this.router.url) {
      this.setStatusMenuByUrl(this.router.url);
    }
    // Escuta eventos de navegação e atualiza o status do menu com base na URL
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.setStatusMenuByUrl(event);
    });
  }

   // Método que ativa ou desativa os itens de menu com base na URL
  setStatusMenuByUrl(event: any): void {
    this.menus.map((m: any) => {
      if (m.levelTwo?.length > 0) {
        m.levelTwo.map((l2: any) => {
          if (l2.url === event.url || l2.url === event){
            m.active = true;  // Marca o menu como ativo se a URL corresponder
          }
        });
      }
    });
  }

  // Método que alterna a visibilidade da sidebar
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar(); // Chama o serviço para alternar o estado da sidebar
  }

  // Método que alterna a visibilidade dos itens de menu (submenu)
  toggleMenu(index: number): void {
    if (this.menus) {
      // Fecha todos os menus ativos, exceto o menu selecionado
      this.menus.filter(
        (menu: any, i: any) => i !== index && menu.active
      ).forEach((menu: any) => menu.active = !menu.active);

      // Alterna o estado ativo do menu no índice fornecido
      this.menus[index].active = !this.menus[index].active;
    }
  }
}
