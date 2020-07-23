import React, { FC, useState, useEffect } from 'react';

const App: FC = () => {
  /* console.log('MyComponent1'); */
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('useEffect');
    setName('John');
    /* setName('John' + (new Date()).getTime()); */
  }, [name]);

  console.log('MyComponent2');
  console.log(name);
  return <h1>Hello, {name}</h1>
}

export default App;
