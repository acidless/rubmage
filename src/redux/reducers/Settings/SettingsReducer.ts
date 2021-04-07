import ActionsType from '../Types';
import { Reducer } from 'redux';

/*====================*/

const SET_THEME = 'Rubmage/Settings/SET-THEME';

/*====================*/

const initState = {
  appearance: {
    theme: 'dark' as 'dark' | 'light',
  },
};

const parsedState = JSON.parse(localStorage.getItem('settings') || JSON.stringify(initState));

type SettingsStateType = typeof parsedState;
export type AppearanceSettingsType = typeof parsedState.appearance;

/*====================*/

type Actions = ActionsType<typeof SettingsActions>;

/*====================*/

const SettingsReducer: Reducer<SettingsStateType, Actions> = function (state = parsedState, action) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        appearance: {
          ...state.appearance,
          theme: action.payload.theme,
        },
      };
    default:
      return state;
  }
};

/*====================*/

export const SettingsActions = {
  setTheme(theme: 'dark' | 'light') {
    return <const>{ type: SET_THEME, payload: { theme } };
  },
};

/*====================*/

export default SettingsReducer;
