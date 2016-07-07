import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Ng2hwAppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(Ng2hwAppComponent, [
    HTTP_PROVIDERS
]);
