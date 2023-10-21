import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AdminComponent } from './admin/admin.component';
import { UsuariosCadastradosComponent } from './usuarios-cadastrados/usuarios-cadastrados.component';
import { UsuariosAprovadosComponent } from './usuarios-aprovados/usuarios-aprovados.component';
import { UsuariosReprovadosComponent } from './usuarios-reprovados/usuarios-reprovados.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: 'admin', component: AdminComponent},
      { path: 'usuarios-cadastrados', component: UsuariosCadastradosComponent},
      { path: 'usuarios-aprovados', component: UsuariosAprovadosComponent},
      { path: 'usuarios-reprovados', component: UsuariosReprovadosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
