import { isReactDOMTextNode } from '@myReact/utils/typeGuards';

export default function createElement(tag: string | Function, props: object, ...children: ReactDOM.Element[]): ReactDOM.Element {
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }
  return { tag, props, children: vaildateChildren(children) };
}

function vaildateChildren(children: ReactDOM.Element[]): ReactDOM.Element[] {
  let newChildren = [...children];

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
