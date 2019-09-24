import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../containers/Register/Register';
import Login from '../containers/Login/Login';
import Alert from '../components/Alert/Alert';


import Dashboard from '../containers/Dashboard/Dashboard';

import PrivateRoute from '../components/routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
