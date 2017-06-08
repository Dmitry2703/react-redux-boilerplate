import React from 'react';

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
  <div className="test">Hello, World!</div>
);

export default App;
