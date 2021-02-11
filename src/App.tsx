import React, { useState } from 'react';
import './App.scss';
import './font.scss';
import AppMenu from './component/appMenu/AppMenu';

function App() {
  const [appState, setAppState] = useState(<div/>);

  return (
    <div className={'app'}>
      <div className={'appWrap'}>
        {appState}
      </div>
      <AppMenu setAppState={setAppState}/>
    </div>
  );
}

export default App;
