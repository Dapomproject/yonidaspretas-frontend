import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaService {

  constructor(
    private http: HttpClient,
  ) { }

  forgotPassword(email: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/esqueci-senha`, email)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
}
