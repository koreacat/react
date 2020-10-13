import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import HamTaker from './component/hamTaker/HamTaker';

function App() {
  const [appState, setAppState] = useState(<HamTaker></HamTaker>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
