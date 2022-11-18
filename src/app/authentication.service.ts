import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService, User } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user$ = new Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private apiService: ApiService, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user$ = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
  
  login(email: string, password: string): Observable<User | null> {
    return this.apiService.login(email, password).pipe(
      map(
        user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          } else {
            throw new Error('Error Authenticating');
          }

        }
      )
    )
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  get isAuthenticated(): Observable<boolean> {
    return this.userSubject
      .pipe(map((u: User) => u?.isAuthenticated ?? false));
  }
}
