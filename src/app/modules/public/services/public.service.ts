import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
