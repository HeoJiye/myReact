import { createUseState } from './useState';

const HOOK_COMPONENTS: { [key: number]: ReactHook.Component } = {};
const RELOAD_COMPONENT_FUNCS: { [key: number]: Function } = {};

export function createHookComponent(key: number): ReactHook.Component {
  const [useState, resetStateIdx] = createUseState(key);

  const hookComponent = {
    useState,
    resetHookIdxs: () => {
      resetStateIdx();
    }
  };
  HOOK_COMPONENTS[key] = hookComponent;
  return hookComponent;
}

export function getHookComponent(key: number): ReactHook.Component {
  return HOOK_COMPONENTS[key];
}

export function setReloadFunc(key: number, reloadFunc: Function): void {
  RELOAD_COMPONENT_FUNCS[key] = reloadFunc;
}

export function getReloadFunc(key: number): Function {
  return RELOAD_COMPONENT_FUNCS[key];
}
