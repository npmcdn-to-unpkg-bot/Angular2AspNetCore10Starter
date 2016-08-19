import {Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit} from '@angular/core';
import {MdSidenav} from '@angular2-material/sidenav/sidenav';

import {Puppy} from './shared/puppy';
import {PuppiesService} from './shared/puppies.service';
import {Media} from './shared';

@Component({
  //moduleId: module.id,
  selector: 'site-app',
  templateUrl: './app/site.component.html',
  styleUrls: ['./app/site.component.css'],
  directives: [
  ],
  providers: [
    PuppiesService,
    Media
  ]
})
export class SiteAppComponent 
  implements OnInit, OnDestroy, AfterViewInit {
  
  static SIDE_MENU_BREAKPOINT: string = 'gt-md';
  @Input() fullPage: boolean = this.media.hasMedia(SiteAppComponent.SIDE_MENU_BREAKPOINT);

  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    },
    {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets"
    }
  ];
  dogs: Object[] = [];

  @ViewChild(MdSidenav) private sidenav: MdSidenav;

  private _subscription = null;

  constructor(
    private puppiesService: PuppiesService,
    private media: Media) {
  }

  ngOnInit() {
    this.puppiesService.getPuppies().then((data) => {
      this.dogs = data;
    });
  }

  ngAfterViewInit(): any {
    let query = Media.getQuery(SiteAppComponent.SIDE_MENU_BREAKPOINT);
    this._subscription = this.media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.sidenav.mode = mql.matches ? 'side' : 'over';
      this.sidenav.toggle(mql.matches).catch(() => undefined);
    });
  }

  ngOnDestroy(): any { 
    this._subscription.unsubscribe(); 
  }
}
