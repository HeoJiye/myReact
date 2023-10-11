export function isReactDOMElement(node: ReactDOM.Node): node is ReactDOM.Element {
  return typeof node !== 'string' && typeof node !== 'number' && typeof node !== 'boolean';
}
export function isReactDOMTextNode(node: ReactDOM.Node): node is ReactDOM.TextNode {
  return typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean';
}
export function isReactDOMSVGElement(element: ReactDOM.Element): boolean {
  return element.tag === 'svg' || element.tag === 'path' || element.tag === 'g';
}

function isElement(node: Element | Text): node is Element {
  return node instanceof Element;
}
function isSVGElement(node: Element): node is SVGElement {
  return node instanceof SVGElement;
}
