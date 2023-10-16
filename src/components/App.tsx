import React from '@myReact';
import logo from '../assets/logo.svg';
import './App.css';

function App(): JSX.Element {
  const [count, setCount] = React.useState<number>(0);
  const ref = React.useRef();

  React.useEffect(() => {
    console.log('count가 바뀔 때 마다 실행: ' + count);
  }, [count]);

  React.useEffect(() => {
    console.log('최초 한번 렌더링될 때 실행: ' + ref.current);
    ref.current.style.animation = 'App-logo-spin infinite 20s linear';
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          ref={ref}
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
