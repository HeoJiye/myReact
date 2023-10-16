const observeState: any[][] = [];
const effects: (() => void)[] = [];

let effectIdx = 0;

export default function useEffect(effectFunc: () => void, states: any[]): void {
  if (observeState.length === effectIdx) {
    observeState.push(states);
    effects.push(effectFunc);
  } else if (states.some((state, idx) => state !== observeState[effectIdx][idx])) {
    effects.push(effectFunc);
    observeState[effectIdx] = states;
  }
  effectIdx++;
}

export function runEffects(): void {
  effects.forEach(effect => effect());
  effects.length = 0;
}

export function resetEffectIdx(): void {
  effectIdx = 0;
}
