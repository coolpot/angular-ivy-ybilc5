import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: string;
  isAuthenticated: boolean;
  token?: any;
  profileImgUrl?: string;
}

interface DbUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  lastLogin: string;
  profileImgUrl?: string;
}

const usersDb: DbUser[] = [
  {
    email: 'test@test.con',
    password: 'test',
    firstName: 'User 1 Fn',
    lastName: 'User 1 Ln',
    lastLogin: '2022-08-16T11:55:26+00:00',
    profileImgUrl: 'https://www.cambridgesciencepark.co.uk/media/uploads/files/ITO.png'
  },
];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  login(email: string, password: string): Observable<User | null> {
    const dbUser = usersDb.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );
    if (dbUser) {
      const user = { ...dbUser, isAuthenticated: true };
      delete user.password;
      return of(user);
    }
    return of(null);
  }
}
