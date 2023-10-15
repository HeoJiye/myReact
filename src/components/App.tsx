import React from '@myReact';
import logo from '../assets/logo.svg';
import './App.css';

function App(this: ReactHook.Component) {
  const [count, setCount] = this.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          <p>{`count: ${count}`}</p>
          <button onclick={() => setCount(count => count + 1)}>count up</button>
        </p>
      </header>
    </div>
  );
}

export default App;