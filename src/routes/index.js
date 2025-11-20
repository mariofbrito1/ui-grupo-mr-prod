import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
//import SamplePage from './Pages/SamplePage';
import Dash from './Dashboards/Crm';
import Error403 from './Pages/403';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';
import ResetPasswordPage from './Auth/ResetPassword';
import Users from './modules/Users';
import UsersAdd from './modules/Users/AddEditUser';
import Roles from './modules/Roles';
import AddEditRol from './modules/Roles/AddEditRol';  

 
import { useHistory } from 'react-router-dom';  

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  const history = useHistory(); 
 

  useEffect(() => {
    //console.log('authUser>>', authUser)
  }, [authUser]);
  // encargado de guardar el estado del usuario logeado o no

  const onLogoutClick = () => {
    history.push('/signup');
    window.location.reload(true);
  };

  if (location.pathname === '' || (location.pathname === '/' && !authUser)) {
    return <Redirect to={'/signin'} />;
  } else if (authUser?.changePassword) {
    onLogoutClick();
    return;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/dash'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />  
        {true && <Route path="/dash" component={Dash} />} 
        {true && <Route exact path="/user/roles" component={Roles} />}
        {true && <Route exact path="/user/roles/:id" component={AddEditRol} />} 
        {true && <Route exact path="/user/users" component={Users} />}
        {true && <Route exact path="/user/users/:id" component={UsersAdd} />} 
        
        {!authUser ? <Redirect to={'/signin'} /> : <Route component={Error403} />}
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
