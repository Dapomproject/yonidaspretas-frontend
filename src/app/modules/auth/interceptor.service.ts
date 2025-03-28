import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService: AuthService) { }

   /**
   * Intercepta todas as requisições HTTP e adiciona o token de autenticação no cabeçalho.
   * @param request Requisição HTTP original
   * @param next Manipulador da requisição HTTP
   * @returns Observable<HttpEvent<any>> com a requisição modificada
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona a requisição e adiciona o cabeçalho "Accept: application/json"
    // Clona novamente a requisição e adiciona o token de autenticação no cabeçalho "Authorization"
    request = request.clone({headers: request.headers.set('Accept', 'application/json')}).clone({
      setHeaders: {
        Authorization: `${this.authService.getToken()}`
      }
    });
    // Passa a requisição modificada para o próximo manipulador
    return next.handle(request);
  }
}
