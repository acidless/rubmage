import { createStore, combineReducers, applyMiddleware } from 'redux';
import AuthReducer from './reducers/Auth/authReducer';
import thunk from 'redux-thunk';
import ErrorReducer from './reducers/Error/ErrorReducer';
import DialogsReducer from './reducers/Dialogs/DialogsReducer';
import MessagesReducer from './reducers/Messages/MessagesReducer';
import SettingsReducer from './reducers/Settings/SettingsReducer';

/*====================*/

const rootReducer = combineReducers({
  auth: AuthReducer,
  dialogs: DialogsReducer,
  messages: MessagesReducer,
  error: ErrorReducer,
  settings: SettingsReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

/*====================*/

setInterval(() => {
  localStorage.setItem('settings', JSON.stringify(store.getState().settings));
}, 2000);

/*====================*/

export default store;
