import React from 'react';
import catJpg from './cat.jpg';
import catPng from './cat.png';
import catSvg from './cat.svg';

const obj1 = {
  first: 1,
  second: '2',
};

const obj2 = {
  ...obj1,
  second: '3',
};

console.log(obj1, obj2);

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
