import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaService {

  constructor(
    private http: HttpClient, // Injeta o serviço HttpClient para fazer requisições HTTP
  ) { }


  /**
   * Envia uma requisição para o servidor para solicitar a recuperação de senha
   * @param email Dados do e-mail para a recuperação
   * @returns Observable com a resposta da requisição
   */
  forgotPassword(email: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/esqueci-senha`, email) // Envia o e-mail para o endpoint de recuperação
      .pipe(
        retry(1), // Tenta novamente em caso de erro (1 vez)
        catchError(this.handleError) // Captura e trata os erros de requisição
      );
  }

  /**
   * Trata os erros de requisição HTTP
   * @param error Objeto de erro retornado pela requisição
   * @returns Observable com a mensagem de erro
   */
  handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente (exemplo: erro de rede)
      errorMessage = error.error.message;
    } else {
      // Erro do lado do servidor (exemplo: erro 500, 404)
      errorMessage = error.error;
    }
    // Retorna um erro através de throwError() para que possa ser tratado nos componentes
    return throwError(errorMessage);
  }
}
