import React from 'react';
import catJpg from './cat.jpg';
import catPng from './cat.png';
import catSvg from './cat.svg';

const App = () => (
  <div>
    <div className="test">Hello, World!</div>
    <img src={catJpg} alt="Cat in jpeg" />
    <img src={catPng} alt="Cat in png" />
    <img src={catSvg} alt="Cat in svg" />
    <div className="bg-img"></div>
  </div>
);

export default App;
