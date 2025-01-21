import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';
import { MinhaContaComponent } from './usuarios/minha-conta/minha-conta.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { FormPerguntasComponent } from './form-perguntas/form-perguntas.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
     { path: '', component: HomeComponent },
     { path: 'rizoma/:nome', component: HomeDetalhesComponent },
     { path: 'cadastro', component: FormPerguntasComponent },
     { path: 'minha-conta', component: MinhaContaComponent, 
     canActivate: [AuthGuardService],
     data: {tipoUsuario: 'client'} },
     { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
