import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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
        // * of: is a way of creating an observable based on the value being specified in parenthesis.
        return of(undefined);
      })
    );
  }

  getSuggestions(query: string): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(
      `${this.base}/heroes?q=${query}&_limit=6`
    );
  }

  // !CRUD:

  addHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http.post<HeroInterface>(`${this.base}/heroes`, hero);
  }
  updateHero(hero: HeroInterface): Observable<HeroInterface> {
    if (!hero.id) {
      throw Error('valid hero id is needed!');
    }

    return this.http.patch<HeroInterface>(
      `${this.base}/heroes/${hero.id}`,
      hero
    );
  }
  deleteHeroById(id: string): Observable<boolean> {
    // * when making this request it will return an empty object or an error in case it doesnt exist, therefore we should also pipe this
    return this.http.delete(`${this.base}/heroes/${id}`).pipe(
      // *in order to transfrom response, we use map:

      map((res) => {
        return true;
      }),

      catchError((err) => {
        return of(false);
      })
    );
  }
}
