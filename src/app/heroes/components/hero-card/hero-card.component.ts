import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';

@Component({
  selector: 'component-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [],
})
export class HeroCardComponent implements OnInit {
  @Input() public inputHero!: HeroInterface;

  ngOnInit(): void {
    if (!this.inputHero) {
      throw Error('missing hero property!');
    }
  }
}
