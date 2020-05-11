import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom'
import Hello from 'containers/Hello';
import HelloSomeone from 'containers/HelloSomeone';

const App: FC<{}> = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Hello />
        </Route>
        <Route path="/hello/:name" exact>
          <HelloSomeone />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
