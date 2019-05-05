import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './pages/Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import 'normalize.css';
import GlobalStyle from './styles/global';
import typography from './styles/typography';
import * as serviceWorker from './serviceWorker';

typography.injectStyles();

const routing = (
  <>
    <GlobalStyle></GlobalStyle>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/private" component={App} />
      </div>
    </Router>
  </>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
