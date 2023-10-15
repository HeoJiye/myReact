import render from './render';

let CONTAINER: Element;
let CUR_REACTDOM: ReactDOM.Node;

export default function createRoot(container: Element | null) {
  if (container === null) {
    throw new Error('React.createRoot: container is null. It must be a DOM element.');
  }
  CONTAINER = container;
  return {
    render: (jsx: JSX.Element) => {
      CUR_REACTDOM = jsx;
      const htmlDOM = render(CUR_REACTDOM);
      container.replaceChildren(htmlDOM);
    }
  };
}

export function getContainer() {
  if (CONTAINER === undefined) {
    throw new Error('CONTAINER is undefined. It must use React.createRoot to create CONTAINER.');
  }
  return CONTAINER;
}
export function getCurReactDOM() {
  if (CUR_REACTDOM === undefined) {
    throw new Error('CUR_REACTDOM is undefined. It must use React.createRoot to create CUR_REACTDOM.');
  }
  return CUR_REACTDOM;
}
