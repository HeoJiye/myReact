import { resetStateIdx } from './useState';

export { default as useState } from './useState';

export function resetHookIdx(): void {
  resetStateIdx();
}
