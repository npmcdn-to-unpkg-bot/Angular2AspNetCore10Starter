import { Component } from '@angular/core';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup, MdUniqueSelectionDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {Puppy} from './shared/puppy';
import {PuppiesService} from './shared/puppies.service';

@Component({
  moduleId: module.id,
  selector: 'ng2hw-app',
  templateUrl: 'ng2hw.component.html',
  styleUrls: ['ng2hw.component.css'],
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
    PuppiesService
  ]
})
export class Ng2hwAppComponent {
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

  constructor(private puppiesService: PuppiesService) {
    this.puppiesService.getPuppies().then((data) => {
      this.dogs = data;
    });
  }
}
