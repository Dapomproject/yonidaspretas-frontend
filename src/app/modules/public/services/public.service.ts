import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry} from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public subjectServicos = new Subject(); // Cria um Subject para enviar notificações de eventos

  constructor(
    private http: HttpClient // Injeta o serviço HttpClient para realizar requisições HTTP
  ) { }

 // Método para obter os estados do IBGE
  getEstadosIBGE(): Observable<any> {
    return this.http.get<any>(environment.API_IBGE) // Faz uma requisição GET para a URL de estados
    .pipe(
      retry(1), // Tenta a requisição novamente em caso de falha, uma vez
      catchError((error) => {return error}) // Captura e retorna qualquer erro da requisição
    );
  }

  // Método para obter as cidades do IBGE baseado no estado (UF)
  getCidadesIBGE(UF: string): Observable<any> {
    return this.http.get<any>(`${environment.API_IBGE}/${UF}/municipios`) // Faz uma requisição GET para a URL de cidades do estado
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para criar um novo cliente
  newUserClient(userClient: any): Observable<any>  {
    return this.http.post<any>(`${environment.API_URL}/new-user-client`, userClient)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para atualizar um cliente existente
  updateUserClient(ID: number, userClient: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-user/${ID}`, userClient)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para atualizar o status de um cliente
  updateStatusUserClient(ID: number, status: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-status-user/${ID}`, status)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para atualizar o status de verificação de um cliente
  updateVerifyedUserClient(ID: number, status: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-verifyed-user/${ID}`, status)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para obter todos os cliente
  getUsersClient(): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/all-users-client`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para filtrar clientes com base em filtros fornecidos
  getUsersFilters(filters: any): Observable<any>  {
    return this.http.post<any>(`${environment.API_URL}/all-user-filters`, filters)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para obter um cliente por ID
  getUsersClientById(ID: number): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/user-client-id/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para excluir um cliente por ID
  deleteUsersClientById(ID: number): Observable<any>  {
    return this.http.delete<any>(`${environment.API_URL}/delete-user-client/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

   // Método para excluir o login de um cliente com base no ID de usuário
  deleteUsersClientLoginByUsuarioID(ID: number): Observable<any>  {
    return this.http.delete<any>(`${environment.API_URL}/delete-user-client-login/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  // Método para baixar um arquivo PDF
  downloadPDF(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, 'arquivo.pdf');  // Salva o arquivo PDF utilizando a função saveAs
    });
  }

  
}
