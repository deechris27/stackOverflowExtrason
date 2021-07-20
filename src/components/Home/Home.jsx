import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = ({ userIDNumber, setIfSignUp }) => {
  const history = useHistory();
  const [userID, setUserID] = useState(userIDNumber);

  const onExitHandler = () => {
    localStorage.clear();
    setIfSignUp(false);
  };

  useEffect(() => {
    //history.replace('/home');
    if (userIDNumber.length) {
      localStorage.setItem('userID', JSON.stringify(userIDNumber));
      console.log('userIDNumber', userIDNumber);
    } else if (userIDNumber === '') {
      setUserID(JSON.parse(localStorage.getItem('userID')));
      console.log('userID', userID);
    }
  }, []);

  return (
    <div className='home-div'>
      <header className='home-header'>Home</header>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginRight: '-90px', display: 'inline-block' }}>
          Soon...
        </h2>
        <h3 className='id-style'>{`In Home component: ${userID}` }</h3>
        <br />
        <button onClick={onExitHandler}> Exit</button>
      </div>
    </div>
  );
};

export default Home;
