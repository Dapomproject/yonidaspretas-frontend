import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgxBootstrapModule } from '../shared/ngx-bootstrap.module';
import { UsuariosCadastradosComponent } from './usuarios-cadastrados/usuarios-cadastrados.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosAprovadosComponent } from './usuarios-aprovados/usuarios-aprovados.component';
import { UsuariosReprovadosComponent } from './usuarios-reprovados/usuarios-reprovados.component';


@NgModule({
  declarations: [
    PrivateComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    UsuariosCadastradosComponent,
    UsuariosAprovadosComponent,
    UsuariosReprovadosComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    NgxBootstrapModule,
    SharedModule
  ]
})
export class PrivateModule { }
