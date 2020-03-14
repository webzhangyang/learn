import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [num, setNum] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>change num now!</button>
        <button onClick={() => setNum(0)}>clear num now!</button>
      </section>
    </div>
  );
}

export default App;
