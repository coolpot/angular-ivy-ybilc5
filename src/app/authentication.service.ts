import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiService, User } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user$ = new BehaviorSubject<User>(null);

  constructor(private apiService: ApiService, private router: Router) {}

  login(username: string, password: string): Observable<User | null> {
    // your code here
    return of(null);
  }

  logout(): void {
    this.user$.next(null);
    this.router.navigateByUrl('/login');
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user$
      .asObservable()
      .pipe(map((u: User) => u?.isAuthenticated ?? false));
  }
}
