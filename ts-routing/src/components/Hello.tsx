import React, { FC } from 'react';

interface HelloProps {
  history: () => void
}

const HelloComponent: FC<HelloProps> = ({ history }) => (
  <div className="hello-component">
    <h1>Hello</h1>
    <button onClick={history}>
      Next
    </button>
  </div>
);

export default HelloComponent;
