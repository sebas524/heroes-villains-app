import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: HeroInterface[] = [];
  public selectedHero?: HeroInterface;

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    console.log({ value });
    this.heroesService.getSuggestions(value).subscribe((data) => {
      this.heroes = data;
    });
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: HeroInterface = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
