import { Component } from '@angular/core';
import { Business } from './sections/business/business';
import { Hero } from './sections/hero/hero';
import { Logos } from './sections/logos/logos';
import { FutureBanner } from './sections/future-banner/future-banner';
import { IndustryStandard } from './sections/industry-standard/industry-standard';
import { StartBuilding } from './sections/start-building/start-building';
import { Suite } from './sections/suite/suite';
import { Why } from './sections/why/why';

@Component({
  selector: 'app-home',
  imports: [Hero, Logos, Business, Suite, StartBuilding, IndustryStandard, Why, FutureBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
