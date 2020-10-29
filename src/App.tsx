import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import HamderTale from "./component/hamderTale/HamderTale";
import Canvas from "./component/canvas/components/Canvas";

function App() {
  const [appState, setAppState] = useState(<Canvas></Canvas>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
