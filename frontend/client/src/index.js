import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";
import Feed from "./Feed";
import signModal from "./signModal";
import Login from "./Login";
import CreatePost from "./CreatePost";
import Search from "./Search";
import Profile from "./Profile";
import Results from "./Results";
import MyFeed from './MyFeed';
import UserResult from './UserResult';


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/Feed" component={Feed} />
      <Route path="/Signup" component={Signup} />
      <Route path="/signModal" component={signModal} />
      <Route path="/Login" component={Login} />
      <Route path="/CreatePost" component={CreatePost} />
      <Route path="/Search" component={Search} />
      <Route path="/Results/:id,:type" component={Results}/>
      <Route path="/MyFeed" component={MyFeed}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/UserResult/:id" component={UserResult}/>
      
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
// ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
