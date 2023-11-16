import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

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
    return this.http.get<any>(`${environment.API_IBGE}/${UF}/microrregioes`)
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

  getUsersClient(): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/all-users-client`)
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
