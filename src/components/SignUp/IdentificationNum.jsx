import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './IdentificationNum.css';

const IdentNumber = ({ setPersonalID }) => {
  const [IDNumber, setIDNumber] = useState('');
  const [legalID, setLegalID] = useState('');
  const [errorMessage, setMessage] = useState('');
  const [activeInput, setActiveBool] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log('useEffect ' + IDNumber);

    if (IDNumber === '' || IDNumber.length < 9) {
      console.log('Deleting message');
      setMessage('');
      setLegalID('');
    }
    console.log(activeInput);
    if (IDNumber.length === 9 && activeInput) {
      handleCheckID();
    }
  }, [IDNumber]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        console.log('POP', history.length >= 1);

        history.replace('/signup/mobile');
      }
    });
  }, []);

  const onChangeHandler = (event) => {
    //This function allowing only digits to be enterd in the input field
    const isDigits = event.target.value.replace(/\D/g, '');
    setIDNumber(isDigits);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('IDNumber.length ' + IDNumber.length);
      handleCheckID();
    }
  };

  const handleCheckID = () => {
    if (!activeInput) {
      setActiveBool(true);
      console.log('activeInput set to ', activeInput);
    }
    if (!IDNumber) {
      console.log('IDNumber has no length');
      //setLegalID('');
      return;
    }

    console.log('handleCheckID ', activeInput);
    if (IDNumber.length > 0 && IDNumber.length < 9) {
      setMessage('not legal');
    } else if (IDNumber.length === 9 && IDNumber !== '000000000') {
      if (is_israeli_id_number(IDNumber)) {
        setLegalID(IDNumber);
        setMessage('');
        setTimeout(() => {
          // props.afterSubmit();
          setPersonalID(IDNumber);
          history.push('/signup/password');
        }, 500);
      } else {
        setMessage('not legal');
      }
    }
  };

  const is_israeli_id_number = (id) => {
    console.log('is_israeli_id_number ' + id);
    console.log(id.length);
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id;
    return (
      Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) %
        10 ===
      0
    );
  };

  return (
    <div className='form-div'>
      <h1 className='h1'>Enter this number  311229934</h1>
      <input
        className='inputStyle'
        autoFocus
        maxLength='9'
        type='text'
        autoComplete='off'
        value={IDNumber}
        id='idNum'
        onChange={(event) => onChangeHandler(event)}
        onKeyPress={(event) => onKeyPress(event)}
      />{' '}
      <br />{' '}
      <button onClick={handleCheckID} style={{ width: '90px' }}>
        {' '}
        continue{' '}
      </button>
      <div id='error'>{errorMessage}</div>
      {/* <button onClick={() => history.replace('/signup/mobile')}>Back</button> */}
      <br /> <p className='revealId'> {legalID}</p>
    </div>
  );
};

export default IdentNumber;

