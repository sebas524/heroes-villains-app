import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public fetchedHeroes: HeroInterface[] = [];
  constructor(private heroesService: HeroesService) {}
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((data) => {
      return (this.fetchedHeroes = data);
    });
  }
}
