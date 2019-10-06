import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routing/Routes';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Alert from './components/Alert/Alert';
import Dashboard from './containers/Dashboard/Dashboard';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Forgot from './components/Forgot/Forgot';
import CheckEmail from './components/CheckEmail/CheckEmail';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route exact path='/add-expense' component={Dashboard} />
          <Route exact path='/forgot' component={Forgot} />
          <Route exact path='/check-email' component={CheckEmail}/>
        <Route exact path='/reset-password/:header/:payload/:signature' component={ResetPassword} />
        <Route exact path='/userProfile' component={userProfile}/>
        
          <Routes />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
