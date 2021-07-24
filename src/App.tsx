import React from 'react';
import logo from './logo.svg';
import AutoComplete from './AutoComplete/AutoComplete';

import './App.css';

function App() {
  const results = [
    'one',
    'two',
    'three',
  ]

  return (
    <div className="App">
      <header className="App-header">
        AutoComplete Search
      </header>
      <AutoComplete onSelectItem={() => {}} />
    </div>
  );
}

export default App;
