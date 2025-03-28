import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService, // Injeta o serviço de autenticação
    private router: Router // Injeta o serviço de navegação
  ) { }

   /**
   * Método que verifica se o usuário tem permissão para acessar uma rota protegida
   * @param route Informações sobre a rota que está sendo acessada
   * @param state Estado atual da navegação
   * @returns true se o usuário pode acessar, false se não pode
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica se o usuário está autenticado e tem a permissão necessária para acessar a rota
    if (this.authService.getToken() && route.data.tipoUsuario.indexOf(this.authService.getPermission()) !== -1) {
      return true;
    }
     // Se o usuário não estiver autenticado ou não tiver permissão, redireciona para a página de login
    this.router.navigate(['/login']);
    return false; // Bloqueia o acesso à rota
  }
}
