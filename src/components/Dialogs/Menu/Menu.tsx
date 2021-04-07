import React from 'react';
import './menu.scss';
import { useSelector } from 'react-redux';
import { GetCurrentUser } from '../../../redux/reducers/Auth/authSelector';
import { Link } from 'react-router-dom';

/*====================*/

type PropsType = {
  isActive: boolean;
  setActive: (val: boolean) => void;
};

/*====================*/

const Menu: React.FC<PropsType> = function ({ setActive, isActive }) {
  const currentUser = useSelector(GetCurrentUser);

  function closeHandler(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  }

  return (
    <div
      onClick={(e) => {
        closeHandler(e);
      }}
      className={`${isActive ? 'active ' : ''} menu-wrapper`}
    >
      <div className="menu flex-container">
        <div className="menu__profile-info">
          <div className="flex-container">
            <div className="profile-info__avatar">
              <img className="roundy-icon" src={currentUser ? currentUser.photo : '#'} alt="" />
            </div>
            <div className="profile-info__name">
              <p>{currentUser ? currentUser.login : 'LOGIN'}</p>
            </div>
          </div>
        </div>
        <div className="menu__settings">
          <Link to="/settings" className="flex-container">
            <span className="material-icons">settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

/*====================*/

export default Menu;
