import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroInterface } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private base: string = environment.baseUrl;

  // * httpClient is for making http requests
  constructor(private http: HttpClient) {}

  // ! HTTP REQUESTS:
  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(`${this.base}/heroes`);
  }
}
