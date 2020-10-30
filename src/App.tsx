import React, { useState } from 'react';
import './App.scss';
import AppMenu from './component/appMenu/AppMenu';
import ArtGalley from "./component/artGalley/ArtGalley";

function App() {
  const [appState, setAppState] = useState(<ArtGalley></ArtGalley>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
