import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    //private authService: AuthService,
    private router: Router
  ) { }

  register(user: any): Observable<any> {
    return of([])
  }

  login(user: any): Observable<any> {
    return of([])
  }
}
