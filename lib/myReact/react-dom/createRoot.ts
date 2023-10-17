import { resetHookIdx, runEffects } from '@myReact/react-hook';
import render from './render';

// 전역으로 저장해두고, 추후 rerender에서 사용하는 변수들
let CONTAINER: Element;
let REACTDOM_FUNC: Function;
let CUR_REACTDOM: ReactDOM.Element;

type ReactRoot = {
  render: (reactDOMFunc: Function) => void;
};

// HtmlElement를 받아서 root를 생성하는 함수 (render 함수를 가진 객체를 반환)
export default function createRoot(container: Element | null): ReactRoot {
  if (container === null) {
    throw new Error(
      'React.createRoot: container is null. It must be a DOM element.'
    );
  }
  CONTAINER = container;

  return {
    // reactDOMFunc: reactDOM을 생성하는 함수 (함수형 컴포넌트)
    render: (reactDOMFunc: Function) => {
      REACTDOM_FUNC = reactDOMFunc;
      CUR_REACTDOM = reactDOMFunc();
      resetHookIdx(); // 가상 돔을 생성한 뒤에는 hookIdx를 초기화해주어야 함

      const htmlDOM = render(CUR_REACTDOM);
      container.replaceChildren(htmlDOM);
      runEffects(); // 실제 돔 렌더링 이후에 실행될 effect가 있다면 실행
    }
  };
}

export function getContainer(): Element {
  if (CONTAINER === undefined) {
    throw new Error(
      'CONTAINER is undefined. It must use React.createRoot to create CONTAINER.'
    );
  }
  return CONTAINER;
}
export function getCurReactDOM(): ReactDOM.Element {
  if (CUR_REACTDOM === undefined) {
    throw new Error(
      'CUR_REACTDOM is undefined. It must use React.createRoot to create CUR_REACTDOM.'
    );
  }
  return CUR_REACTDOM;
}
export function setCurReactDOM(reactDOM: ReactDOM.Element): void {
  CUR_REACTDOM = reactDOM;
}
export function getReactDOMFunc(): Function {
  if (REACTDOM_FUNC === undefined) {
    throw new Error(
      'REACTDOM_FUNC is undefined. It must use React.createRoot to create REACTDOM_FUNC.'
    );
  }
  return REACTDOM_FUNC;
}
