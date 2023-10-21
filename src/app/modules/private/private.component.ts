import { Component } from '@angular/core';



@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  menusBackOffice: any[] = [
    {
      name: 'Dashboard',
      iconClass: 'bx bx-home-alt-2',
      active: false,
      url: '/private/admin',
    },
    {
      name: 'Usuários',
      iconClass: 'bx bx-group',
      active: false,
      url: '#',
      levelTwo: [
        { name: 'Cadastrados', url: '/private/usuarios-cadastrados', active: false, },
        { name: 'Aprovados', url: '/private/usuarios-aprovados', active: false, },
        { name: 'Reprovados', url: '/private/usuarios-reprovados', active: false, },
      ]
    },
    {
      name: 'Dados Freelancer',
      iconClass: 'bx bxs-user-badge',
      active: false,
      url: '/admin/freelancers',
    },
    {
      name: 'Dados Contratantes',
      iconClass: 'bx bxs-user-detail',
      active: false,
      url: '/admin/contratantes',
    }
  ];
}
