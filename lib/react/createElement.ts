import { renderWithHooks } from '@lib/react-reconciler';
import { isReactDOMTextNode } from '@lib/utils/typeGuards';

// ReactDOM.Element(가상 돔)을 생성하는 함수
export default function createElement(tag: string | Function, props: object, ...children: ReactDOM.Element[]): ReactDOM.Element {
  if (typeof tag === 'function') {
    const component: ReactDOM.Component = {
      tag: tag,
      props: {
        ...props,
        children: vaildateChildren(children)
      }
    };

    return renderWithHooks(component);
  }
  return { tag, props, children: vaildateChildren(children) };
}

function vaildateChildren(children: ReactDOM.Element[]): ReactDOM.Element[] {
  let newChildren = [...children];

  // 자식 중에 fragment tag가 있을 경우, 풀어주는 과정
  newChildren = newChildren.flat();
  while (newChildren.some(child => isFragmentElement(child))) {
    newChildren = newChildren.map(unwrapIfFragmentElement).flat();
  }

  return newChildren;
}

function isFragmentElement(child: ReactDOM.Element): boolean {
  return !isReactDOMTextNode(child) && !child?.tag;
}

function unwrapIfFragmentElement(child: ReactDOM.Element): ReactDOM.Element[] | ReactDOM.Element {
  if (isFragmentElement(child)) {
    return child?.children;
  }
  return child;
}
