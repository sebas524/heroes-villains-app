import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroInterface, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [],
})
export class NewHeroPageComponent implements OnInit {
  public myForm = new FormGroup({
    // * you can specify the type in <>
    id: new FormControl<string>(''),
    // * {} means more options, such as nonNullable: true which means super hero needs to have something,it cannot be null.
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  get currentHero(): HeroInterface {
    const hero = this.myForm.value as HeroInterface;
    return hero;
  }

  constructor(
    private heroesService: HeroesService,
    private aR: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.aR.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroById(id);
        })
      )
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        this.myForm.reset(hero);
        return;
      });
  }

  onSubmit() {
    if (!this.myForm.valid) {
      return;
    }

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`${hero.superhero} has been updated!`);
      });

      return;
    }
    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} has been updated!`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) {
      throw Error(' Hero id is required!');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.myForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => {
          return result;
        }),
        switchMap(() => {
          return this.heroesService.deleteHeroById(this.currentHero.id);
        }),
        filter((deleted: boolean) => {
          return deleted;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) {
    //     return;
    //   }
    //   this.heroesService
    //     .deleteHeroById(this.currentHero.id)
    //     .subscribe((deleted) => {
    //       if (deleted) {
    //         this.router.navigate(['/heroes']);
    //       }
    //     });
    // });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', { duration: 2500 });
  }
}
