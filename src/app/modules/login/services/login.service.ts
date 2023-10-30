import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-user-login`, user)
      .pipe(
        retry(1),
        map(res => {
          this.authService.setDataInLocalStorage('token', res.token);
          this.authService.logged.next(true);
          res.data.tipoUsuario === 'adm' ? this.router.navigate(['/private/admin']) : this.router.navigate(['/minha-conta']);
        }),
        catchError(this.handleError)
      );
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/login`, user)
      .pipe(
        retry(1),
        map(res => {
          this.authService.setDataInLocalStorage('token', res.token);
          this.authService.setDataInLocalStorage('user_permission', res.data.tipoUsuario);
          this.authService.logged.next(true);
          if (res.data.tipoUsuario === environment.USER_TYPE.ADM) {
            this.router.navigate(['/private/admin']);
          } else if (res.data.tipoUsuario === environment.USER_TYPE.CLIENTE) {
            this.router.navigate(['/minha-conta']);
          }
        }),
        catchError(this.handleError)
      );
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.http.post<any>(`${environment.API_URL}/logout`, {})
      .subscribe(res => {
        this.authService.setDataInLocalStorage('token', res.token);
        this.authService.clearStorage();
        this.authService.logged.next(false);
        this.router.navigate(['/login']);
      });
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
