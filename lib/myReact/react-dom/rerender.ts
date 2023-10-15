import { isReactDOMComponent, isReactDOMTextNode } from '@myReact/utils/typeGuards';
import { getHookComponent, getReloadFunc } from '@myReact/react-hook';

import { getContainer, getCurReactDOM } from './createRoot';
import reconcileDOM from './reconcileDOM';

export default function rerender(key: number) {
  const [reactDOM, htmlDOM] = getCurDOMs();
  const result = findComponentByKey(reactDOM, htmlDOM, key);
  if (result === null) {
    throw new Error(`Cannot find component with key ${key}`);
  }

  const [component, dom] = result;
  const newComponent: ReactDOM.Component = updateComponent(component);
  reconcileDOM(component, newComponent, dom);
}

function getCurDOMs(): [ReactDOM.Node, Element] {
  const htmlDOM = getContainer().firstChild as Element;
  if (htmlDOM === null) {
    throw new Error('CONTAINER is empty. It must use React.createRoot to create a root.');
  }
  const reactDOM = getCurReactDOM();

  return [reactDOM, htmlDOM];
}

function findComponentByKey(reactDOM: ReactDOM.Node, htmlDOM: Element, key: number): [ReactDOM.Component, Element] | null {
  if (isReactDOMComponent(reactDOM) && reactDOM.key === key) {
    return [reactDOM, htmlDOM];
  }

  if (isReactDOMTextNode(reactDOM)) return null;

  const componentIdx = reactDOM.children.findIndex((child, idx) => findComponentByKey(child, htmlDOM.children[idx], key));
  if (componentIdx === -1) {
    return null;
  }
  return [reactDOM.children[componentIdx] as ReactDOM.Component, htmlDOM.children[componentIdx]];
}

function updateComponent(component: ReactDOM.Component): ReactDOM.Component {
  const hookComponent = getHookComponent(component.key);
  const reloadFunc = getReloadFunc(component.key);

  hookComponent.resetHookIdxs();
  const newComponent = {
    key: component.key,
    ...reloadFunc.call(hookComponent)
  };
  hookComponent.resetHookIdxs();

  return newComponent;
}
