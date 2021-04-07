import React from 'react';
import './SmallLoader.scss';

/*====================*/

function SmallLoader({ isActive }: { isActive: boolean }) {
  return (
    <div className={`${isActive ? 'active ' : ''}small-loader flex-container`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

/*====================*/

export default SmallLoader;
