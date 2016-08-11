import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';

import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES, MdSidenav } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { Puppy } from './shared/puppy';
import { PuppiesService } from './shared/puppies.service';
import { MATERIAL_BROWSER_PROVIDERS, Media } from './shared';

@Component({
  moduleId: module.id,
  selector: 'site-app',
  templateUrl: 'site.component.html',
  styleUrls: ['site.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  providers: [
    MdUniqueSelectionDispatcher,
    MdIconRegistry,
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
  // [
  //   {name: "Porter"},
  //   {name: "Mal"},
  //   {name: "Razzle"},
  //   {name: "Koby"},
  //   {name: "Molly"},
  //   {name: "Husi"}
  // ];

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

  ngOnDestroy(): any { this._subscription.unsubscribe(); }
}
