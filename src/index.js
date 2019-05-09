import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalStyle from './styles/global';
import typography from './styles/typography';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
//import App from './App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import withAuth from './components/PrivateRoute';
import * as serviceWorker from './serviceWorker';

typography.injectStyles();

const routing = (
  <>
    <GlobalStyle></GlobalStyle>
    <Router>
      <div>
        <Route
          render={ props =>
            props.location.pathname === '/' ? (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  state: { from: props.location }
                }}
              />
            ) : null
          }
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={withAuth(Dashboard)} />
      </div>
    </Router>
  </>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
