import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Signup from './signModal'
import Feed from './Feed'

const routing = (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Feed">Feed</Link>
          </li>
          <li>
            <Link to="/signModal">Signup</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path = "/Feed" component = {Feed} />
        <Route path= "/signModal" component={Signup} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))
//ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();