import React from 'react';
import '../settings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GetAppearanceSettings } from '../../../../redux/reducers/Settings/SettingsSelector';
import Checkbox from '../../../Checkbox/Checkbox';
import { SettingsActions } from '../../../../redux/reducers/Settings/SettingsReducer';

/*====================*/

function AppearanceSettings() {
  const settings = useSelector(GetAppearanceSettings);
  const dispatch = useDispatch();

  /*====================*/

  function changeTheme(value: boolean) {
    dispatch(SettingsActions.setTheme(value ? 'dark' : 'light'));
  }

  /*====================*/

  return (
    <div className="settings-wrapper flex-container">
      <h1 className="settings__heading">Внешний вид</h1>
      <div className="settings__line flex-container">
        <Checkbox onChange={changeTheme} checked={settings.theme === 'dark'} />
        <p>Тёмная тема</p>
      </div>
    </div>
  );
}

/*====================*/

export default AppearanceSettings;
