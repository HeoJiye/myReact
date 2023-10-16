import { resetStateIdx } from './useState';
import { resetEffectIdx } from './useEffect';
import { resetRefIdx } from './useRef';

export { default as useState } from './useState';
export { default as useEffect, runEffects } from './useEffect';
export { default as useRef } from './useRef';

export function resetHookIdx(): void {
  resetStateIdx();
  resetEffectIdx();
  resetRefIdx();
}
