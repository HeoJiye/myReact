import { resetHookIdx, runEffects } from '@myReact/react-hook';

import {
  getContainer,
  getCurReactDOM,
  getReactDOMFunc,
  setCurReactDOM
} from './createRoot';
import reconcileDOM from './reconcileDOM';

// setState 사용 등에 의해 다시 렌더링할 때 호출되는 함수
// reconcileDOM()을 사용해 가상 돔을 비교해서 실제 돔을 업데이트
export default function rerender() {
  const [reactDOM, htmlDOM, reactDOMFunc] = getRootData();

  const newReactDOM: ReactDOM.Element = reactDOMFunc();
  resetHookIdx();
  reconcileDOM(reactDOM, newReactDOM, htmlDOM);
  setCurReactDOM(newReactDOM);
  runEffects();
}

function getRootData(): [ReactDOM.Element, Element, Function] {
  const htmlDOM = getContainer().firstChild as Element;
  if (htmlDOM === null) {
    throw new Error(
      'CONTAINER is empty. It must use React.createRoot to create a root.'
    );
  }
  const reactDOM = getCurReactDOM();
  const reactDOMFunc = getReactDOMFunc();

  return [reactDOM, htmlDOM, reactDOMFunc];
}
