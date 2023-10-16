import { resetHookIdx, runEffects } from '@myReact/react-hook';

import { getContainer, getCurReactDOM, getReactDOMFunc } from './createRoot';
import reconcileDOM from './reconcileDOM';

export default function rerender() {
  const [reactDOM, htmlDOM, reactDOMFunc] = getRootData();

  const newReactDOM: ReactDOM.Element = reactDOMFunc();
  resetHookIdx();

  reconcileDOM(reactDOM, newReactDOM, htmlDOM);
  runEffects();
}

function getRootData(): [ReactDOM.Element, Element, Function] {
  const htmlDOM = getContainer().firstChild as Element;
  if (htmlDOM === null) {
    throw new Error('CONTAINER is empty. It must use React.createRoot to create a root.');
  }
  const reactDOM = getCurReactDOM();
  const reactDOMFunc = getReactDOMFunc();

  return [reactDOM, htmlDOM, reactDOMFunc];
}
