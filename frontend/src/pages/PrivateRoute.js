import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (
    rest.path === '/login' 
    // rest.path === '/register' 
    // rest.path === '/forgot-password' ||
    // rest.path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...rest}>{children}</Route>
    );
  }

  
  // if (rest.path === '/') {
  //   console.log(currentUser.privilege)
  //   return currentUser && currentUser.privilege === 'staff' ? (
  //     <Route {...rest}>{children}</Route>
  //   ) : (
  //     <Redirect to={location.state?.from ?? '/infors'} />
  //   );
  // }
  // if (rest.path === '/') {
  //   return currentUser &&
  //     ['staff'].includes(currentUser.privilege) ? (
  //     <Route {...rest}>{children}</Route>
  //   ) : (
  //     <Redirect to={location.state?.from ?? '/'} />
  //   );
  // }

  if (rest.path === '/CashFlows') {
    return currentUser &&
      ['admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  if (rest.path === '/bloodStorages') {
    return currentUser &&
      ['admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  if (rest.path === '/staffs') {
    return currentUser &&
      ['admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  if (rest.path === '/infors') {
   
    return currentUser &&
      ['staff', 'admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  if (rest.path === '/donates') {
    return currentUser &&
      ['staff', 'admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  if (rest.path === '/bloodDonates') {
    return currentUser &&
    ['staff', 'admin'].includes(currentUser.privilege) ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }
  

  if (rest.path === '/accounts') {
    return currentUser && currentUser.privilege === 'admin' ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to={location.state?.from ?? '/'} />
    );
  }

  return currentUser ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: rest.path },
      }}
    />
  );
};
export default PrivateRoute;
