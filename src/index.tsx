import React from '@myReact';

function App(): JSX.Element {
  return <div>Hello World!</div>;
}

const root = React.createRoot(document.getElementById('root'));
root.render(<App />);
