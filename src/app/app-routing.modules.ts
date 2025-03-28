import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './modules/auth/auth-guard.service';

// Definindo as rotas da aplicação
const routes: Routes = [
  {
    path: '', // A rota inicial (root)
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),  // Carrega o módulo 'PublicModule' quando acessado
  },
  {
    path: 'private', // Rota para área privada
    loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule),  // Carrega o módulo 'PrivateModule'
    canActivate: [AuthGuardService],  // Protege esta rota com o AuthGuardService
    data: {tipoUsuario: 'adm'} // Dados adicionais para a rota (ex: tipo de usuário)
  },
  {
    path: 'login', // Rota para a tela de login
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) // Carrega o módulo 'LoginModule'
  },
  {
    path: 'cadastrar-senha', // Rota para a tela de cadastro de senha
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule) // Carrega o módulo 'RegistroModule'
  },
  {
    path: 'esqueci-senha', // Rota para a tela de recuperação de senha
    loadChildren: () => import('./modules/esqueci-senha/esqueci-senha.module').then(m => m.EsqueciSenhaModule) // Carrega o módulo 'EsqueciSenhaModule'
  },
];
// Definindo o módulo de roteamento
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', // Habilita o ancoramento de rolagem para links de âncoras
    scrollPositionRestoration: 'top', // Restaura a posição do scroll para o topo ao navegar entre as páginas
  })],
  exports: [RouterModule] // Exporta o RouterModule para que as rotas estejam disponíveis em toda a aplicação
})
export class AppRoutingModule { }
