import { resetHookIdx, runEffects } from '@myReact/react-hook';
import render from './render';

let CONTAINER: Element;
let REACTDOM_FUNC: Function;
let CUR_REACTDOM: ReactDOM.Element;

export default function createRoot(container: Element | null): { render: (reactDOMFunc: Function) => void } {
  if (container === null) {
    throw new Error('React.createRoot: container is null. It must be a DOM element.');
  }
  CONTAINER = container;

  return {
    render: (reactDOMFunc: Function) => {
      REACTDOM_FUNC = reactDOMFunc;
      CUR_REACTDOM = reactDOMFunc();
      resetHookIdx();

      const htmlDOM = render(CUR_REACTDOM);
      container.replaceChildren(htmlDOM);
      runEffects();
    }
  };
}

export function getContainer(): Element {
  if (CONTAINER === undefined) {
    throw new Error('CONTAINER is undefined. It must use React.createRoot to create CONTAINER.');
  }
  return CONTAINER;
}
export function getCurReactDOM(): ReactDOM.Element {
  if (CUR_REACTDOM === undefined) {
    throw new Error('CUR_REACTDOM is undefined. It must use React.createRoot to create CUR_REACTDOM.');
  }
  return CUR_REACTDOM;
}
export function getReactDOMFunc(): Function {
  if (REACTDOM_FUNC === undefined) {
    throw new Error('REACTDOM_FUNC is undefined. It must use React.createRoot to create REACTDOM_FUNC.');
  }
  return REACTDOM_FUNC;
}
