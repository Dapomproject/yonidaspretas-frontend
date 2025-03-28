import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient, // Injeção do HttpClient para fazer requisições HTTP
    private authService: AuthService, // Injeção do serviço de autenticação
    private router: Router, // Injeção do serviço de navegação
    private toastr: ToastrService // Injeção do serviço de notificações
  ) { }

  /**
   * Função responsável por registrar um novo usuário
   * @param user Dados do usuário a ser registrado
   */
  register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-user-login`, user) // Faz a requisição POST para registrar o usuário
      .pipe(
        retry(1), // Tenta a requisição uma vez mais em caso de falha
        map(res => { // Processa a resposta da requisição
          this.authService.setDataInLocalStorage('token', res.token); // Salva o token de autenticação no localStorage
          this.authService.logged.next(true); // Define que o usuário está logado
          // Direciona para a página correta dependendo do tipo de usuário
          res.data.tipoUsuario === 'adm' ? this.router.navigate(['/private/admin']) : this.router.navigate(['/login']);
          this.toastr.success('Cadastro realizado!', ''); // Exibe uma notificação de sucesso
        }),
        catchError(this.handleError) // Captura erros e os envia para o handler
      );
  }

  /**
   * Função responsável por realizar o login de um usuário
   * @param user Dados do usuário para login
   */
  login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/login`, user) // Faz a requisição POST para login do usuário
      .pipe(
        retry(1), // Tenta a requisição uma vez mais em caso de falha
        map(res => { // Processa a resposta da requisição
          this.authService.setDataInLocalStorage('token', res.token); // Salva o token de autenticação
          this.authService.setDataInLocalStorage('user_permission', res.data.tipoUsuario); // Salva o tipo de usuário no localStorage
          this.authService.logged.next(true); // Define que o usuário está logado
          // Direciona para a página correta dependendo do tipo de usuário
          if (res.data.tipoUsuario === environment.USER_TYPE.ADM) {
            this.router.navigate(['/private/admin']); // Página de administração
          } else if (res.data.tipoUsuario === environment.USER_TYPE.CLIENTE) {
            this.router.navigate(['/minha-conta']); // Página do cliente
          }
        }),
        catchError(this.handleError) // Captura erros e os envia para o handler
      );
  }

   /**
   * Função para atualizar a senha do usuário
   * @param userID ID do usuário
   * @param user Dados de nova senha
   */
  atualizarSenhaUsuario(userID: any, user: any): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/atualizar-senha/${userID}`, user) // Faz a requisição PATCH para atualizar a senha
      .pipe(
        retry(1), // Tenta a requisição uma vez mais em caso de falha
        map(() => {  // Processa a resposta da requisição
          this.router.navigate(['/login']); // Redireciona o usuário para a página de login
          this.toastr.success('Senha atualizada com sucesso, faça login em sua conta!', '',  {
            timeOut: 6000, // Exibe a notificação por 6 segundos
          });
        }),
        catchError(this.handleError) // Captura erros e os envia para o handler
      );
  }

  //Função para obter os dados do usuário logado
  getUser(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user`) // Faz a requisição GET para obter os dados do usuário
      .pipe(
        retry(1), // Tenta a requisição uma vez mais em caso de falha
        catchError(this.handleError) // Captura erros e os envia para o handler
      );
  }

  //Função para fazer o logout do usuário
  logout(): void {
    this.http.post<any>(`${environment.API_URL}/logout`, {}) // Faz a requisição POST para realizar o logout
      .subscribe(res => {
        this.authService.setDataInLocalStorage('token', res.token); // Remove o token do localStorage
        this.authService.clearStorage(); // Limpa o armazenamento do usuário
        this.authService.logged.next(false); // Define que o usuário não está mais logado
        this.router.navigate(['/login']); // Redireciona para a página de login
      });
  }

   /**
   * Função para tratar erros das requisições HTTP
   * @param error Erro recebido da requisição
   */
  handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Se o erro for no lado do cliente
      errorMessage = error.error.message;
    } else {
     // Se o erro for no lado do servidor
      errorMessage = error.error;
    }
    return throwError(errorMessage); // Lança o erro para ser tratado em outra parte do código
  }
}
