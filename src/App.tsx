import React from 'react';
import AutoComplete from './AutoComplete/AutoComplete';

import './App.css';

function App() {
  const select = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    alert('You have selected ' + e.currentTarget.text)
  }

  return (
    <div className="App">
      <header className="App-header">
        AutoComplete Search
      </header>
      <AutoComplete onSelectItem={select} />
    </div>
  );
}

export default App;
