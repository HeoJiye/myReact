import ReactCurrentDispatcher from './ReactCurrentDispatcher';

function resolveDispatcher() {
  if (ReactCurrentDispatcher.current === null) {
    throw new Error('Hooks can only be called inside a component');
  }
  return ReactCurrentDispatcher.current;
}

export function useState<T>(initState: T): [T, (newState: T | ((curState: T) => T)) => void] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initState);
}

export function useEffect(effectFunc: () => void, states: any[] = []): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(effectFunc, states);
}

export function useRef(): { current: any } {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef();
}
