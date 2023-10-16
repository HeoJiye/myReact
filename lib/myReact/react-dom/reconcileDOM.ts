import { isReactDOMTextNode } from '@myReact/utils/typeGuards';
import render from './render';

export default function reconcileDOM(prevReactDOM: ReactDOM.Element, nextReactDOM: ReactDOM.Element, htmlDOM: Element): void {
  if (prevReactDOM.tag != nextReactDOM.tag) {
    replaceDOM(nextReactDOM, htmlDOM);
    return;
  }

  reconcileProps(prevReactDOM, nextReactDOM, htmlDOM);
  reconcileChildren(prevReactDOM, nextReactDOM, htmlDOM);
}

function reconcileProps(prevReactDOM: ReactDOM.Element, nextReactDOM: ReactDOM.Element, htmlDOM: Element): void {
  const checkNullOrDiff = (reactDOM: ReactDOM.Element, key: string) => {
    return reactDOM.props === null || reactDOM.props[key] === null || prevReactDOM.props[key] !== nextReactDOM.props[key];
  };

  Object.keys(prevReactDOM.props ?? {}).forEach((key: string) => {
    if (checkNullOrDiff(nextReactDOM, key)) {
      if (key === 'className') {
        htmlDOM.removeAttribute('class');
        return;
      }
      delete (htmlDOM as any)[key];
    }
  });
  Object.keys(nextReactDOM.props ?? {}).forEach((key: string) => {
    if (checkNullOrDiff(prevReactDOM, key)) {
      (htmlDOM as any)[key] = nextReactDOM.props[key];
    }
  });
}

function reconcileChildren(prevReactDOM: ReactDOM.Element, nextReactDOM: ReactDOM.Element, htmlDOM: Element): void {
  if (isReactDOMTextNode(nextReactDOM.children[0])) {
    if (prevReactDOM.children[0] !== nextReactDOM.children[0]) {
      htmlDOM.textContent = nextReactDOM.children[0].toString();
    }
    return;
  }

  const minChildrenLength = Math.min(prevReactDOM.children.length, nextReactDOM.children.length);

  for (let idx = 0; idx < minChildrenLength; idx++) {
    reconcileDOM(prevReactDOM.children[idx], nextReactDOM.children[idx], htmlDOM.children[idx]);
  }

  prevReactDOM.children.slice(minChildrenLength).forEach((_, idx: number) => htmlDOM.children[idx].remove());

  htmlDOM.append(...nextReactDOM.children.slice(minChildrenLength).map(render));
}

function replaceDOM(reactDOM: ReactDOM.Element, htmlDOM: Element): void {
  const newDom = render(reactDOM);
  htmlDOM.replaceWith(newDom);
}
