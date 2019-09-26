import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Register from '../../containers/Register/Register';
// import Login from '../../containers/Login/Login';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Alert from '../Alert/Alert';
import Features from '../Features/Features';
import Downloads from '../Downloads/Downloads';
import Faqs from '../Faqs/Faqs';
import Contact from '../Contact/Contact';
import Landing from '../Landing/Landing';
import Navbar from '../Navbar/Navbar';
import NotFound from '../NotFound/NotFound';
const Routes = () => {
  return (
    <>
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/features' component={Features} />
        <Route exact path='/downloads' component={Downloads} />
        <Route exact path='/faqs' component={Faqs} />
        <Route exact path='/contact' component={Contact} />
        <Route component={NotFound} />
        {/* <Route component={NotFound} /> */}
        </Switch>
      </>
  );
};

export default Routes;
