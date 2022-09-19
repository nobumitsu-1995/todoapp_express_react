import React from 'react'
import Header from './components/templates/Header';
import Router from "./Router";

const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <Router/>
    </div>
  );
}

export default App;
