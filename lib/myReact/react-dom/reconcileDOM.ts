import { isReactDOMTextNode } from '@myReact/utils/typeGuards';
import render from './render';

// 가상 돔의 변화를 비교해서 실제 돔에 적용하는 함수
export default function reconcileDOM(
  prevReactDOM: ReactDOM.Element,
  nextReactDOM: ReactDOM.Element,
  htmlDOM: Element
): void {
  // tag가 다르면 그 부분을 다시 렌더링해서 대체한다.
  if (prevReactDOM.tag != nextReactDOM.tag) {
    replaceDOM(nextReactDOM, htmlDOM);
    return;
  }

  // props가 다르면 props만 바꾸고, 자식들은 다시 렌더링해서 대체한다.
  if (reconcileProps(prevReactDOM, nextReactDOM, htmlDOM)) {
    htmlDOM.innerHTML = '';
    htmlDOM.append(...nextReactDOM.children.map(render));
    return;
  }

  reconcileChildren(prevReactDOM, nextReactDOM, htmlDOM);
}

function reconcileProps(
  prevReactDOM: ReactDOM.Element,
  nextReactDOM: ReactDOM.Element,
  htmlDOM: Element
): boolean {
  let changed = false;
  const checkNullOrDiff = (reactDOM: ReactDOM.Element, key: string) => {
    return (
      reactDOM.props === null ||
      reactDOM.props[key] === null ||
      prevReactDOM.props[key] !== nextReactDOM.props[key]
    );
  };

  // 이전에 있던 props 중에 다음에는 없는 props는 삭제
  Object.keys(prevReactDOM.props ?? {}).forEach((key: string) => {
    if (checkNullOrDiff(nextReactDOM, key)) {
      changed = true;
      if (key === 'className') {
        htmlDOM.removeAttribute('class');
        return;
      }
      delete (htmlDOM as any)[key];
    }
  });

  // 다음에 추가된 props는 추가
  Object.keys(nextReactDOM.props ?? {}).forEach((key: string) => {
    if (checkNullOrDiff(prevReactDOM, key)) {
      changed = true;
      (htmlDOM as any)[key] = nextReactDOM.props[key];
    }
  });

  return changed;
}

function reconcileChildren(
  prevReactDOM: ReactDOM.Element,
  nextReactDOM: ReactDOM.Element,
  htmlDOM: Element
): void {
  // 다음 가상 돔이 textNode일 경우, 이전 가상 돔과 다르면 textContent를 변경
  // (text가 태그로 둘러쌓여 있지 않다면, 문제가 생김. 현재는 eslint로 해당 경우를 막아두었음)
  if (isReactDOMTextNode(nextReactDOM.children[0])) {
    if (prevReactDOM.children[0] !== nextReactDOM.children[0]) {
      htmlDOM.textContent = nextReactDOM.children[0].toString();
    }
    return;
  }

  const minChildrenLength = Math.min(
    prevReactDOM.children.length,
    nextReactDOM.children.length
  );

  // 자식들에도 reconcileDOM을 재귀적으로 호출
  for (let idx = 0; idx < minChildrenLength; idx++) {
    reconcileDOM(
      prevReactDOM.children[idx],
      nextReactDOM.children[idx],
      htmlDOM.children[idx]
    );
  }

  // 이전 가상 돔의 자식이 더 많으면, 남은 자식들은 삭제
  prevReactDOM.children
    .slice(minChildrenLength)
    .forEach((_, idx: number) => htmlDOM.children[idx].remove());

  // 다음 가상 돔의 자식이 더 많으면, 남은 자식들은 추가
  htmlDOM.append(...nextReactDOM.children.slice(minChildrenLength).map(render));
}

function replaceDOM(reactDOM: ReactDOM.Element, htmlDOM: Element): void {
  const newDom = render(reactDOM);
  htmlDOM.replaceWith(newDom);
}
