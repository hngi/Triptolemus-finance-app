import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import './App.css';
// import Landing from './components/Landing/Landing';
import Routes from './components/routing/Routes';
// import Navbar from './components/Navbar/Navbar';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          {/* <Navbar /> */}
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
