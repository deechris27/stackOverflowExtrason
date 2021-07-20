import React, { useState, useEffect, createContext } from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import SignUp from '../components/SignUp/SignUp';
import CreatePass from '../components/SignUp/CreatePassword';
import Home from '../components/Home/Home';
import GuardedRoute from './GuardedRoute';
import './App.css';
//localStorage.clear();

const useStateWithLocalStorage = () => {
  const [userSignedUp, setIfSignUp] = useState(
    JSON.parse(localStorage.getItem('signUpBool'))
  );
  useEffect(() => {
    localStorage.setItem('signUpBool', JSON.stringify(userSignedUp));
    console.log(
      'localStorage.getItem(signUpBool)',
      JSON.parse(localStorage.getItem('signUpBool'))
    );
  }, [userSignedUp]);

  return [userSignedUp, setIfSignUp];
};

const App = () => {
  // const [userSignedUp, setIfSignUp] = useState(
  //   JSON.parse(localStorage.getItem('userID')) || true
  // );

  //const [userSignedUp, setIfSignUp] = useState(false);
  const [userID, setUserID] = useState('');
  const [userSignedUp, setIfSignUp] = useStateWithLocalStorage();

  // const booleanContext = createContext(setIfSignUp);

  return (
    // <booleanContext.Provider value={setIfSignUp}>
    <div className='App-div'>
      {userSignedUp ? <Redirect to='/home' /> : <Redirect to='/signup' />}
      {/* <GuardedRoute
        exact
        path='/home'
        component={Home}
        auth={userSignedUp}
        userIDNumber={userID}
        setIfSignUp={setIfSignUp}
      /> */}
      <GuardedRoute exact path='/home' auth={userSignedUp}>
        <Home
          userIDNumber={userID}
          setIfSignUp={setIfSignUp}
          //auth={userSignedUp}
        />
      </GuardedRoute>
      <Switch>
        <Route exact path='/signup'>
          <SignUp setUserNumber={setUserID} setIfSignUp={setIfSignUp} />
        </Route>
        {/* <Route path='/home'>
          <Home
            userIDNumber={userID}
            setIfSignUp={setIfSignUp}
            auth={userSignedUp}
          />
        </Route> */}
        {/* <CreatePass /> */}
      </Switch>
    </div>
    // </booleanContext.Provider>
  );
};

export default App;
