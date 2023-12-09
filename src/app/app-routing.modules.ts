import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './modules/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'private',
    loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuardService],
    data: {tipoUsuario: 'adm'}
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cadastrar-senha',
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule)
  },
  {
    path: 'esqueci-senha',
    loadChildren: () => import('./modules/esqueci-senha/esqueci-senha.module').then(m => m.EsqueciSenhaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
