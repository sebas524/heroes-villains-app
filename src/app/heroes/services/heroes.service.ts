import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HeroInterface } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private base: string = environment.baseUrl;

  // * httpClient is for making http requests
  constructor(private http: HttpClient) {}

  // ! HTTP REQUESTS METHODS:
  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(`${this.base}/heroes`);
  }
  getHeroById(id: string): Observable<HeroInterface | undefined> {
    // * if id endpoint is not recognized by server, then it will give us a 404 not foud error. this is why you gotta handle the error (with .pipe):
    return this.http.get<HeroInterface>(`${this.base}/heroes/${id}`).pipe(
      catchError((err) => {
        // * of: is a way of creating observabled based on the value being specified in parenthesis.
        return of(undefined);
      })
    );
  }
}
