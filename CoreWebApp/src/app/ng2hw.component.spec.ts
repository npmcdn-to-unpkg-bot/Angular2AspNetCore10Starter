import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2hwAppComponent } from '../app/ng2hw.component';

beforeEachProviders(() => [Ng2hwAppComponent]);

describe('App: Ng2hw', () => {
  it('should create the app',
      inject([Ng2hwAppComponent], (app: Ng2hwAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2hw works!\'',
      inject([Ng2hwAppComponent], (app: Ng2hwAppComponent) => {
    expect(app.formShowing).toEqual(false);
  }));
});
