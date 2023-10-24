import { rerender } from '@lib/react-dom';

type State = { current: any };

export default function createHook(hook: Function): [Function, Function] {
  const states: State[] = [];
  let idx = 0;

  const useHook = (...arg: any[]) => {
    if (states.length <= idx) {
      states.push({ current: null });
    }
    return hook.call(null, states[idx++], ...arg);
  };
  const resetHookIdx = () => (idx = 0);

  return [useHook, resetHookIdx];
}

type NewState<T> = T | ((prev: T) => T);

export function useState<T>(state: State, initState: any): [T, (state: NewState<T>) => void] {
  if (state.current === null) {
    state.current = initState;
  }

  function setState<T>(newState: NewState<T>): void {
    if (newState instanceof Function) {
      state.current = newState(state.current);
    } else {
      state.current = newState;
    }
    rerender();
  }

  return [state.current, setState];
}

const effects: (() => void)[] = [];

export function useEffect(effectState: State, effectFunc: () => void, states: any[] = []): void {
  if (effectState.current === null || states.some((state, idx) => state !== effectState.current[idx])) {
    effectState.current = states;
    effects.push(effectFunc);
  }
}

export function runEffects(): void {
  effects.forEach(effect => effect());
  effects.length = 0;
}

export function useRef(refState: State): State {
  return refState;
}
