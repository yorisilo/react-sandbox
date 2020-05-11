import React, { FC } from 'react';

interface HelloSomeoneProps {
  name: string;
  path: string;
  search: string;
  hash: string;
  history: () => void;
}

const HelloSomeoneComponent: FC<HelloSomeoneProps> = ({ name, path, search, hash, history}) => (
  <div className="hello-someone-component">
    <h1>Hello {name}</h1>
    <p>path: {path}</p>
    <p>search: {search}</p>
    <p>hash: {hash}</p>
    <button onClick={history}>Go Back</button>
  </div>
);

export default HelloSomeoneComponent;
