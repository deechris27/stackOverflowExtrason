import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.jsx';
import MobileNum from './MobileNum.jsx';
import IdentNumber from './IdentificationNum.jsx';
import CreatePass from './CreatePassword.jsx';
import './SignUp.css';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const pathArray = ['/signup/mobile', '/signup/idnumber', '/signup/password'];

class SignUp extends Component {
  constructor(props) {
    super(props);
    //this.signUpProcess = this.signUpProcess.bind(this);
    this.state = {
      stage: 1,
    };
  }

  // signUpProcess() {
  //   console.log('signUpProcess');
  //   switch (this.state.stage) {
  //     case 2:
  //       return (
  //         <IdentNumber
  //           setPersonalID={this.props.setUserNumber}
  //           afterSubmit={() => this.setState({ stage: 3 })}
  //         />
  //       );
  //       break;
  //     case 3:
  //       return <CreatePass afterSubmit={() => this.setState({ stage: 4 })} />;
  //     case 4:
  //       return this.props.homePage();
  //       break;
  //     default:
  //       return <MobileNum afterSubmit={() => this.setState({ stage: 2 })} />;
  //   }
  // }

  render() {
    return (
      <div className='signUp-div'>
        <Header />
        
        <Router>
          <div className='form-div'>
          <Redirect to='/signup/mobile' />
            <Switch>
            
              <Route path='/signup/mobile' component={MobileNum} />
              <Route path='/signup/idnumber'>
                <IdentNumber setPersonalID={this.props.setUserNumber} />
              </Route>
              <Route exact path={'/signup/password'}>
                <CreatePass
                  setIfSignUp={this.props.setIfSignUp}
                  pathsArray={pathArray}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default SignUp;
