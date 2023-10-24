import createHook, { useState, useEffect, useRef } from './createHook';

export type Dispatcher = {
  useState: Function;
  useEffect: Function;
  useRef: Function;
  resetHookIdx: Function;

  children: { [key: string]: Dispatcher[] };
  childrenIdx: { [key: string]: number };
};

export default function createDispatcher(): Dispatcher {
  const [useStateHook, resetStateIdx] = createHook(useState);
  const [useEffectHook, resetEffectIdx] = createHook(useEffect);
  const [useRefHook, resetRefIdx] = createHook(useRef);

  return {
    useState: useStateHook,
    useEffect: useEffectHook,
    useRef: useRefHook,
    resetHookIdx: () => {
      resetStateIdx();
      resetEffectIdx();
      resetRefIdx();
    },
    children: {},
    childrenIdx: {}
  };
}
