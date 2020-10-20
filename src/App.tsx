import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import Clock from "./component/clock/Clock";

function App() {
  const [appState, setAppState] = useState(<Clock></Clock>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
