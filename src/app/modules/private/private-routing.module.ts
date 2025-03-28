import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AdminComponent } from './admin/admin.component';
import { UsuariosCadastradosComponent } from './usuarios-cadastrados/usuarios-cadastrados.component';
import { UsuariosAprovadosComponent } from './usuarios-aprovados/usuarios-aprovados.component';
import { UsuariosReprovadosComponent } from './usuarios-reprovados/usuarios-reprovados.component';

// Definindo as rotas para o módulo Private
const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: 'admin', component: AdminComponent}, // Rota para a página do Admin
      { path: 'usuarios-cadastrados', component: UsuariosCadastradosComponent}, // Rota para a página de usuários cadastrados
      { path: 'usuarios-aprovados', component: UsuariosAprovadosComponent},  // Rota para a página de usuários aprovados
      { path: 'usuarios-reprovados', component: UsuariosReprovadosComponent}, // Rota para a página de usuários reprovados
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importa o RouterModule para configurar as rota
  exports: [RouterModule] // Exporta o RouterModule para que as rotas possam ser usadas em outros módulos
})
export class PrivateRoutingModule { }
