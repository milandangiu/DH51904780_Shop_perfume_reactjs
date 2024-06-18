
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import  './style/style.scss'


function App() {

    return (
      <BrowserRouter>
        <RouterCustom/>
      </BrowserRouter>
  );
}

export default App;