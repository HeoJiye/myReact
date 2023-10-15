import rerender from '@myReact/react-dom/rerender';

type StateStore = {
  states: any[];
  stateIdx: number;
};

export function createUseState(key: number): [ReactHook.UseState, () => void] {
  const stateStore: StateStore = {
    states: [],
    stateIdx: 0
  };
  const useStateFunc = useState.bind(null, key, stateStore) as ReactHook.UseState;
  return [useStateFunc, () => resetStateIdx(stateStore)];
}

function useState<T>(key: number, stateStore: StateStore, initState: any): [T, (state: ReactHook.SetStateParam<T>) => void] {
  if (stateStore.states.length === stateStore.stateIdx) {
    stateStore.states.push(initState);
  }

  const curIdx = stateStore.stateIdx;
  stateStore.stateIdx += 1;

  const setState = createSetState<T>(key, stateStore.states, curIdx);
  return [stateStore.states[curIdx], setState];
}

function createSetState<T>(key: number, states: any[], curIdx: number): (state: ReactHook.SetStateParam<T>) => void {
  return (state: ReactHook.SetStateParam<T>): void => {
    if (state instanceof Function) {
      states[curIdx] = state(states[curIdx]);
    } else {
      states[curIdx] = state;
    }
    rerender(key);
  };
}

function resetStateIdx(stateStore: StateStore): void {
  stateStore.stateIdx = 0;
}
