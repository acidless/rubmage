import { Selector } from 'react-redux';
import { AppearanceSettingsType } from './SettingsReducer';
import { AppStateType } from '../../store';

/*====================*/

export const GetAppearanceSettings: Selector<AppStateType, AppearanceSettingsType> = (state) =>
  state.settings.appearance;

export const GetCurrentTheme: Selector<AppStateType, 'dark' | 'light'> = (state) => state.settings.appearance.theme;
