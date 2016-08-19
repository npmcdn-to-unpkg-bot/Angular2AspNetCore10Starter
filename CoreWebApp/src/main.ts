import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './app/';

if (environment.production) {
  enableProdMode();
}

import { SiteAppModule } from './app/site.module';
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';

browserDynamicPlatform().bootstrapModule(SiteAppModule);
