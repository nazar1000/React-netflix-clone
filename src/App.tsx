import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from './components_large/nav';
import MainPage from './page/Main_page';
import axios from 'axios';

function App() {
  const [activePage, setActivePage] = useState<string>("home");

  const updateActivePage = (newPage: string) => {
    setActivePage(newPage.toLowerCase())
  }


  return (
    <div className="App">
      <Nav
        activePage={activePage}
        updateActivePage={updateActivePage}
      />

      {<MainPage
        activePage={activePage}
      />}

    </div>
  );
}

export default App;
