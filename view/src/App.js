import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Landing from './components/Landing/Landing';
import Routes from './components/routing/Routes';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
