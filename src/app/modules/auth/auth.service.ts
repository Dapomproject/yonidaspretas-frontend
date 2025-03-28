import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variável reativa que armazena o estado de login do usuário (true ou false) 
  public logged = new BehaviorSubject<boolean>(false);

  constructor() {
    // Verifica se o usuário está autenticado ao iniciar o serviço
    this.verifyToken();
   }

  /**
   * Armazena um dado no localStorage
   * @param dataName Nome da chave a ser armazenada
   * @param data Valor a ser armazenado
  */
  setDataInLocalStorage(dataName: any, data: any): void {
    localStorage.setItem(dataName, data);
  }

  /**
   * Obtém o token armazenado no localStorage
   * @returns Token do usuário ou null se não existir
  */
  getToken(): any{
    return localStorage.getItem('token');
  }

  /**
   * Obtém a permissão do usuário armazenada no localStorage
   * @returns Permissão do usuário ou null se não existir
  */
  getPermission(): any{
    return localStorage.getItem('user_permission');
  }

  //Verifica se há um token armazenado e atualiza o estado de login
  verifyToken(): any {
    if (this.getToken()) {
      this.logged.next(true); // Define o estado como logado
    } else {
      this.logged.next(false); // Define o estado como deslogado
    }
  }

   /**
   * Retorna um Observable que permite acompanhar o estado de login do usuário
   * @returns Observable<boolean> que emite true se o usuário estiver logado, false caso contrário
   */
  isLoggedIn(): Observable<boolean> {
    return this.logged.asObservable();
  }

  //Remove todos os dados armazenados no localStorage, efetivamente deslogando o usuário
  clearStorage(): void {
    localStorage.clear();
  }
}
