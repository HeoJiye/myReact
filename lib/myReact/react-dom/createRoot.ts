import convertToHtmlDOM from './convertToHtmlDOM';

export default function createRoot(container: Element | null) {
  if (container === null) {
    throw new Error('React.createRoot: container is null. It must be a DOM element.');
  }
  return {
    render: (jsx: JSX.Element) => {
      container.replaceChildren(convertToHtmlDOM(jsx));
    }
  };
}
