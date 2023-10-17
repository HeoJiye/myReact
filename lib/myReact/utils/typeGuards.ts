export function isReactDOMElement(
  node: ReactDOM.Node
): node is ReactDOM.Element {
  if (isReactDOMTextNode(node)) return false;
  return true;
}
export function isReactDOMSVGElement(element: ReactDOM.Element): boolean {
  return element.tag === 'svg' || element.tag === 'path' || element.tag === 'g';
}
export function isReactDOMTextNode(
  node: ReactDOM.Node
): node is ReactDOM.TextNode {
  return (
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean'
  );
}
