import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public fetchedHero?: HeroInterface;
  // * in order to pass in id, you need to know the url value ex: heroes/dc-flash. in order to get dc-flash you need to use ActivatedRoute service!!!!:
  constructor(
    private heroesService: HeroesService,
    private aR: ActivatedRoute,
    //* to remove user from a page:
    private router: Router
  ) {}

  ngOnInit(): void {
    // * look at heroes routing in case you forgot the path.
    this.aR.params
      .pipe(
        // * switchmap allows you to take the params id {id}. and with this it transforms the data:
        switchMap(({ id }) => {
          return this.heroesService.getHeroById(id);
        })
      )
      .subscribe((hero) => {
        // *now params returns a hero or undefined...so lets change its name
        console.log(hero);

        //* handling undefined: if no hero, then we get user off the page(remember to inject Router for this.):
        if (!hero) {
          return this.router.navigateByUrl('/heroes/list');
        }

        return (this.fetchedHero = hero);
      });
  }

  goBack() {
    this.router.navigateByUrl('/heroes/list');
  }
}
