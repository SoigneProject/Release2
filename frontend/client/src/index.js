import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Signup from './Signup'
import Feed from './Feed'
import signModal from './signModal'
import Login from './Login'
import CreatePost from './CreatePost'

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
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/signModal">signModal</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/CreatePost">Create Post</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path = "/Feed" component = {Feed} />
        <Route path= "/Signup" component={Signup} />
        <Route path= "/signModal" component={signModal} />
        <Route path= "/Login" component={Login} />
        <Route path= "/CreatePost" component={CreatePost} />
      </div>
    </Router>
  )
  ReactDOM.render(<Feed/>, document.getElementById('root'))
//ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();