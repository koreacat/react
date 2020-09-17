import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';

function App() {
  const [appState, setAppState] = useState(<></>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
