import {
  isReactDOMSVGElement,
  isReactDOMTextNode
} from '@myReact/utils/typeGuards';

// ReactDOM.Element(가상 돔)을 실제 돔으로 만드는 함수
export default function render(node: ReactDOM.Node): Element | Text {
  if (isReactDOMTextNode(node)) {
    return document.createTextNode(node.toString());
  }
  const element: ReactDOM.Element = node;
  const dom: Element = createEmptyDOM(element);

  if (element.props) {
    Object.keys(element.props).forEach(insertProp.bind(null, dom, element));
  }
  element.children
    .map(child => render(child))
    .forEach(child => dom.appendChild(child));

  return dom;
}

function createEmptyDOM(element: ReactDOM.Element): Element {
  if (isReactDOMSVGElement(element)) {
    return document.createElementNS('http://www.w3.org/2000/svg', element.tag);
  }
  return document.createElement(element.tag);
}

function insertProp(dom: Element, element: ReactDOM.Element, key: string) {
  if (key === 'ref') {
    (element.props['ref'] as any).current = dom;
    return;
  }
  if (isReactDOMSVGElement(element)) {
    dom.setAttribute(key, element.props[key]);
  } else {
    (dom as any)[key] = element.props[key];
  }
}
