import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute></PrivateRoute>
    </Switch>
  );
}

export default App;
