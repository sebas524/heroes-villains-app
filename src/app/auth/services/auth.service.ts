import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  // * remember that all objects in javascript pass through refrence. therefore, when getting current user, you must use spread operator to break that link(the three dots ...).
  private user?: User;

  constructor(private http: HttpClient) {}
  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    // * remember that all objects in javascript pass through refrence. therefore, when getting current user, you must use spread operator to break that link(the three dots ...).
    // return { ...this.user };
    // * but lets try out this new way, structuredClone:
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // * when having a real backend server it would be post not get, but for now lets do get:
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        // * set user:
        this.user = user;
      }),
      tap((user) => {
        // * save to localStorage:
        localStorage.setItem('token', 'heeeeeeeeeeey there');
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    // * remember that we are using of() because we are saying on previous line that we will return an observable of boolean value.
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        this.user = user;
      }),
      map((user) => {
        // * IMPORTANT: if we return just user, we return the object. we want to return a boolean, therefore if we return !user, that means user has no value: false. but thats wrong cause it does have a value, therefore we have to double negate it like this: !!user. this means true.
        return !!user;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
