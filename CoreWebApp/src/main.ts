import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {provideForms, disableDeprecatedForms} from "@angular/forms";

import { SiteAppComponent, environment } from './app/';
import { MATERIAL_BROWSER_PROVIDERS } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(SiteAppComponent, [
    ...MATERIAL_BROWSER_PROVIDERS,
    HTTP_PROVIDERS,
    disableDeprecatedForms(), provideForms()
]);
