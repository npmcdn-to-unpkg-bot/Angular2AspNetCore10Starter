export * from './puppies.service';
export * from './puppy';
export * from './media';
export * from './viewport';

import { Media } from './media';
import { ViewportHelper, BrowserViewportHelper } from './viewport';

/**
 * Material Design component providers for use in the browser.
 */
export const MATERIAL_BROWSER_PROVIDERS: any[] = [
  Media,
  {provide: ViewportHelper, useClass: BrowserViewportHelper}, 
];

/**
 * Please use {@see MATERIAL_NODE_PROVIDERS} or {@see MATERIAL_BROWSER_PROVIDERS}
 * as appropriate.
 *
 * @deprecated
 */
export const MATERIAL_PROVIDERS = MATERIAL_BROWSER_PROVIDERS;

/**
 * Material Design component providers for use in a Node.JS environment.
 */
// export const MATERIAL_NODE_PROVIDERS: any[] = [
//   {provide: ViewportHelper, useClass: NodeViewportHelper},
//   Media,
//   PaginationService,
//   ...INPUT_VALIDATORS
// ];