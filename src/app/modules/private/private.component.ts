import { Component } from '@angular/core';



@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  // Define um array de objetos para os menus do back office
  menusBackOffice: any[] = [
    {
      name: 'Dashboard', // Nome do menu
      iconClass: 'bx bx-home-alt-2', // Classe de ícone (utilizando Boxicons)
      active: false, // Estado do menu (se está ativo ou não)
      url: '/private/admin', // URL para navegação quando o item for clicado
    },
    {
      name: 'Usuários',
      iconClass: 'bx bx-group',
      active: false,
      url: '#', // URL inicial (não definida, será um menu de subitens)
      levelTwo: [ // Define os submenus (nivel 2) para esse item
        { name: 'Cadastrados', url: '/private/usuarios-cadastrados', active: false, }, // Submenu para usuários cadastrados
        { name: 'Aprovados', url: '/private/usuarios-aprovados', active: false, }, // Submenu para usuários aprovados
        { name: 'Reprovados', url: '/private/usuarios-reprovados', active: false, },  // Submenu para usuários reprovados
      ]
    }
  ];
}
