import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetErrorState } from '../../redux/reducers/Error/ErrorSelector';
import './error.scss';

/*====================*/

function Error() {
  const state = useSelector(GetErrorState);
  const [isActive, setErrorActive] = useState(false);
  let timeout;

  /*====================*/

  useEffect(() => {
    if (state.error) {
      clearTimeout(timeout);
      setErrorActive(true);
      timeout = setTimeout(OnDestroy, 5000);

      return () => {
        OnDestroy();
      };
    }
  }, [state]);

  function OnDestroy() {
    setErrorActive(false);
  }

  /*====================*/

  return (
    <div className={`${isActive ? 'active ' : ''}global-error flex-container`}>
      <div className="global-error__info">
        <p className="global-error__message">{state.error}</p>
      </div>
    </div>
  );
}

/*====================*/

export default Error;
