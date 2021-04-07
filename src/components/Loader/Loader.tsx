import React from 'react';
import './loader.scss';

/*====================*/

function Loader() {
  return (
    <div className="loader full-size-block flex-container">
      <svg>
        <circle stroke="#f55636" strokeWidth="6" fill="none" />
      </svg>
    </div>
  );
}

/*====================*/

export default Loader;
