import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routing/Routes';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Switch> 
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />          
            <Routes/>         
          </Switch>
      </Router>
    </Provider>
  );
};

export default App;
