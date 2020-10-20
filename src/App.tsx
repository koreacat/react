import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import HamderTale from "./component/hamderTale/HamderTale";

function App() {
  const [appState, setAppState] = useState(<HamderTale></HamderTale>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
