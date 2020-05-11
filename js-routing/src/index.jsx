import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

function Hello() {
  const history = useHistory();
  return (
    <div>
      <h1>Hello</h1>
      <button
        onClick={() => history.push('/hello/react-router?message=hooks#test')}
      >
        Next
      </button>
    </div>
  );
}

function HelloSomeone() {
  const history = useHistory();
  const location = useLocation();
  const { name } = useParams();
  return (
    <div>
      <h1>Hello {name} !</h1>
      <p>pathname: {location.pathname}</p>
      <p>search: {location.search}</p>
      <p>hash: {location.hash}</p>
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Hello />
        </Route>
        <Route path="/hello/:name" exact>
          <HelloSomeone />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


/* import React from 'react';
 * import ReactDOM from 'react-dom';
 * import './index.css';
 * import App from './App';
 * import * as serviceWorker from './serviceWorker';
 *
 * ReactDOM.render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>,
 *   document.getElementById('root')
 * );
 *
 * // If you want your app to work offline and load faster, you can change
 * // unregister() to register() below. Note this comes with some pitfalls.
 * // Learn more about service workers: https://bit.ly/CRA-PWA
 * serviceWorker.unregister(); */
