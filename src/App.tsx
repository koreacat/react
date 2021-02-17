import React, { useState } from 'react';
import './App.scss';
import './font.scss';
import AppMenu from './component/appMenu/AppMenu';
import FeedingCats from './component/feedingCats/FeedingCats';
import Matterjs from './component/matterjs/Matterjs';

function App() {
  const [appState, setAppState] = useState(<FeedingCats/>);

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
