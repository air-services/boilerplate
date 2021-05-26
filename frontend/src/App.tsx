import React, { useState } from 'react';
import './style.sass';

function App() {
  const [message, setMessage] = useState('not loaded');

  fetch('/api/v1/message')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setMessage(json.message);
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>message: {message}</h1>
      </header>
    </div>
  );
}

export default App;
