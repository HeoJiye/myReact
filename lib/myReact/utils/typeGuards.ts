export function isReactDOMElement(node: ReactDOM.Node): node is ReactDOM.Element {
  if (isReactDOMTextNode(node)) return false;
  return (node as any).key === undefined;
}
export function isReactDOMSVGElement(element: ReactDOM.Element): boolean {
  return element.tag === 'svg' || element.tag === 'path' || element.tag === 'g';
}

export function isReactDOMComponent(node: ReactDOM.Node): node is ReactDOM.Component {
  if (isReactDOMTextNode(node)) return false;
  if (isReactDOMElement(node)) return false;
  return true;
}
export function isReactDOMTextNode(node: ReactDOM.Node): node is ReactDOM.TextNode {
  return typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean';
}

function isElement(node: Element | Text): node is Element {
  return node instanceof Element;
}
function isSVGElement(node: Element): node is SVGElement {
  return node instanceof SVGElement;
}
