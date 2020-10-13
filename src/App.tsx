import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import HellTaker from "./component/hellTaker/HellTaker";

function App() {
  const [appState, setAppState] = useState(<HellTaker></HellTaker>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
