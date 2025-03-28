import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';
import { MinhaContaComponent } from './usuarios/minha-conta/minha-conta.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { FormPerguntasComponent } from './form-perguntas/form-perguntas.component';

// Definindo as rotas para o módulo Public
const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
     { path: '', component: HomeComponent },  // Rota para a página inicial do site (Home)
     { path: 'rizoma/:nome', component: HomeDetalhesComponent }, // Rota para a página de detalhes com um parâmetro 'nome' (HomeDetalhesComponent)
     { path: 'cadastro', component: FormPerguntasComponent }, // Rota para o formulário de cadastro
     { path: 'minha-conta', component: MinhaContaComponent,    // Rota para a área "Minha Conta", com proteção de guarda (AuthGuardService)
      canActivate: [AuthGuardService], // Protege a rota com o guard
      data: {tipoUsuario: 'client'} // Dados adicionais para o guard 
     },
     { path: '', pathMatch: 'full', redirectTo: '' }, // Redirecionamento para a rota inicial (Home)
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importando o RouterModule para configurar as rotas
  exports: [RouterModule] // Exportando o RouterModule para ser utilizado em outros módulos
})
export class PublicRoutingModule { }
