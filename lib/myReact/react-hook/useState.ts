import { rerender } from '@myReact/react-dom';

type SetStateParam<T> = T | ((prev: T) => T);

const states: any[] = [];
let stateIdx = 0;

export default function useState<T>(initState: any): [T, (state: SetStateParam<T>) => void] {
  if (states.length === stateIdx) {
    states.push(initState);
  }

  const curIdx = stateIdx;
  stateIdx += 1;

  return [states[curIdx], setState.bind(null, curIdx)];
}

function setState<T>(curIdx: number, state: SetStateParam<T>): void {
  if (state instanceof Function) {
    states[curIdx] = state(states[curIdx]);
  } else {
    states[curIdx] = state;
  }
  rerender();
}

export function resetStateIdx(): void {
  stateIdx = 0;
}
