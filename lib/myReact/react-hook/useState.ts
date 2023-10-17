import { rerender } from '@myReact/react-dom';

type SetStateParam<T> = T | ((prev: T) => T);

const states: any[] = [];
let stateIdx = 0;

// 초기 state를 받아서 state와 setState를 반환
// useState를 사용할 때마다 stateIdx를 증가시켜서
// 컴포넌트들에서 실행된 각각의 useState의 클로저가 다른 stateIdx를 가리키도록 함
// 전체 가상 돔을 그리고 난 뒤에 stateIdx를 초기화되기 때문에, useState들은 모두 독립적인 stateIdx를 가짐
// (해당 방식의 한계점이 있기 때문에, 추후에 수정될 수 있음)
export default function useState<T>(
  initState: any
): [T, (state: SetStateParam<T>) => void] {
  // 컴포넌트가 생성될 때는 states에 초기 state를 push
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
  // state 값이 수정되면 rerender
  rerender();
}

// stateIdx를 초기화 (가상 돔을 생성한 이후에 사용)
export function resetStateIdx(): void {
  stateIdx = 0;
}
