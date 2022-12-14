import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./modules/home/Home.jsx'));
const Auth = lazy(() => import('./modules/auth/Auth.jsx'));

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route  path="/home" component={Home} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes