import { createHookComponent, setReloadFunc } from './hookComponent';

let INDEX = 0;

export default function createComponentKey(reloadFunc: Function): number {
  createHookComponent(INDEX);
  setReloadFunc(INDEX, reloadFunc);
  return INDEX++;
}
