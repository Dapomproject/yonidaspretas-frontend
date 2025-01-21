import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry} from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public subjectServicos = new Subject();

  constructor(
    private http: HttpClient
  ) { }


  getEstadosIBGE(): Observable<any> {
    return this.http.get<any>(environment.API_IBGE)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  getCidadesIBGE(UF: string): Observable<any> {
    return this.http.get<any>(`${environment.API_IBGE}/${UF}/municipios`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  newUserClient(userClient: any): Observable<any>  {
    return this.http.post<any>(`${environment.API_URL}/new-user-client`, userClient)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  updateUserClient(ID: number, userClient: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-user/${ID}`, userClient)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  updateStatusUserClient(ID: number, status: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-status-user/${ID}`, status)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  updateVerifyedUserClient(ID: number, status: any): Observable<any>  {
    return this.http.patch<any>(`${environment.API_URL}/update-verifyed-user/${ID}`, status)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  getUsersClient(): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/all-users-client`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  getUsersFilters(filters: any): Observable<any>  {
    return this.http.post<any>(`${environment.API_URL}/all-user-filters`, filters)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  getUsersClientById(ID: number): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/user-client-id/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }


  deleteUsersClientById(ID: number): Observable<any>  {
    return this.http.delete<any>(`${environment.API_URL}/delete-user-client/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  deleteUsersClientLoginByUsuarioID(ID: number): Observable<any>  {
    return this.http.delete<any>(`${environment.API_URL}/delete-user-client-login/${ID}`)
    .pipe(
      retry(1),
      catchError((error) => {return error})
    );
  }

  downloadPDF(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, 'arquivo.pdf');
    });
  }

  
}
