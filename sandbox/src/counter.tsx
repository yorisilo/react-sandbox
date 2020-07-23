import React, { useState } from 'react';

// [React Context / Hooks 入門](https://uncle-javascript.com/react-context-beginning)
export const Counter = () => {
  const [state, setState] = useState(1);

  const plus = (cstate: number) => {
    setState(cstate + 1);
  };

  return (
    <div className="Counter">
      <h1>{state}</h1>
      <h2 onClick={() => plus(state)}>click</h2>
    </div>
  )
};
