import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function GuardedRoute({ children, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return auth === true ? children : <Redirect to='/signup' />;
      }}
    />
  );
}

export default GuardedRoute;

// const GuardedRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     render={(props) =>
//       auth === true ? (
//         <Component {...props} {...rest} />
//       ) : (
//         <Redirect to='/signup' />
//       )
//     }
//   />
// );

// const GuardedRoute = ({ component: Component, auth, path, ...rest }) => {
//   return (
//     <Route>
//       {auth === true ? <Component {...rest} /> : <Redirect to='/signup' />}
//     </Route>
//   );
// };

// function GuardedRoute({ children, auth, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return auth === true ? children : <Redirect to='/signup/mobile' />;
//       }}
//     />
//   );
// }
