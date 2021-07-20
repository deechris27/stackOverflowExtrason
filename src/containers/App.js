import React, { useState, useEffect, createContext } from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import SignUp from '../components/SignUp/SignUp';
import CreatePass from '../components/SignUp/CreatePassword';
import Home from '../components/Home/Home';
import GuardedRoute from './GuardedRoute';
import MobileNum from '../components/SignUp/MobileNum';
import IdentNumber from '../components/SignUp/IdentificationNum';
import Header from '../components/SignUp/Header';
import './App.css';

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

const pathArray = ['/signup/mobile', '/signup/idnumber', '/signup/password'];

const App = () => {

  const [userID, setUserID] = useState('');
  const [userSignedUp, setIfSignUp] = useStateWithLocalStorage();


  return (
    <div className='App-div'>
      <Header />
      {userSignedUp ? <Redirect to='/home' /> : <Redirect exact to='/' />}
      <Switch>
        <Redirect exact from='/' to="/signup/mobile" />
        <Route path='/signup/mobile' component={MobileNum} />
        <Route path='/signup/idnumber'>
          <IdentNumber setPersonalID={setUserID} />
        </Route>
        <Route path='/signup/password'>
          <CreatePass
            setIfSignUp={setIfSignUp}
            pathsArray={pathArray}
          />
        </Route>
        <Route path='/signup'>
          <SignUp setUserNumber={setUserID} setIfSignUp={setIfSignUp} />
        </Route>
        <GuardedRoute path='/home' auth={userSignedUp}>
          <Home
            userIDNumber={userID}
            setIfSignUp={setIfSignUp}
          />
        </GuardedRoute>

        {/* <GuardedRoute path='/home' auth={userSignedUp}>
        <Home
          userIDNumber={userID}
          setIfSignUp={setIfSignUp}
        />
      </GuardedRoute>
      {/* <Redirect from="/signup" to='/signup/mobile' /> */}
        {/* <Route path='/signup'>
          <SignUp setUserNumber={setUserID} setIfSignUp={setIfSignUp} />
        </Route>
        <Route path='/signup/mobile' component={MobileNum} />
        <Route exact path="/">
          { userSignedUp ? <Redirect to="/home" /> : <Redirect to="/signup" />}
        </Route>  */}
      </Switch>
    </div>
  );
};

export default App;
