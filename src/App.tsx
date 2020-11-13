import React, { useState } from 'react';
import './App.scss';
import './font.scss';
import AppMenu from './component/appMenu/AppMenu';
import ArtGalley from "./component/artGalley/ArtGalley";
import Canvas from './component/canvas/App';

function App() {
  const [appState, setAppState] = useState(<ArtGalley/>);

  return (
    <div className="App">
      {appState}
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
