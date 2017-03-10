import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, Output }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  public visible = true;

  @Output() open: EventEmitter<any> =  new EventEmitter();
  @Output() close: EventEmitter<any> =  new EventEmitter();

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);

    //this.toggle();
  }

  toggle(): any {
    this.visible = !this.visible;

    if (this.visible) {
      this.open.emit(this.visible);
    } else {
      this.close.emit(this.visible);
    }
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
