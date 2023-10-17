const observeState: any[][] = [];
const effects: (() => void)[] = [];

let effectIdx = 0;

export default function useEffect(
  effectFunc: () => void,
  states: any[] = []
): void {
  // 컴포넌트에서 처음 effect를 실행할 때는 무조건 effectFunc를 push.
  if (observeState.length === effectIdx) {
    observeState.push(states);
    effects.push(effectFunc);
  }
  // 이후에는 states가 바뀌었을 때만 effectFunc를 push.
  else if (
    states.some((state, idx) => state !== observeState[effectIdx][idx])
  ) {
    effects.push(effectFunc);
    observeState[effectIdx] = states;
  }
  // effectIdx를 증가시켜 다음 effect를 위해 준비.
  effectIdx++;
}

// push된 effect들을 실행하고 리셋
export function runEffects(): void {
  effects.forEach(effect => effect());
  effects.length = 0;
}

// effectIdx를 초기화 (가상 돔을 생성한 이후에 사용)
export function resetEffectIdx(): void {
  effectIdx = 0;
}
