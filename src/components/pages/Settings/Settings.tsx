import React from 'react';
import './settings.scss';
import { Link } from 'react-router-dom';

/*====================*/

function Settings() {
  return (
    <div className="settings-wrapper flex-container">
      <h1 className="settings__heading">Настройки</h1>
      <div className="settings">
        <div className="settings__setting-type flex-container">
          <Link to="settings/appearance" className="flex-container">
            <span className="material-icons">wb_incandescent</span>
            <p>Внешний вид</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

/*====================*/

export default Settings;
