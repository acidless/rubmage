import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Index from './components/pages/Messenger';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { GetAuthStatus } from './redux/reducers/Auth/authSelector';
import { Auth } from './redux/reducers/Auth/authReducer';
import { ErrorActions } from './redux/reducers/Error/ErrorReducer';
import Error from './components/Error/Error';
import Dialogs from './components/Dialogs/Dialogs';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import io from 'socket.io-client';
import Settings from './components/pages/Settings/Settings';
import AppearanceSettings from './components/pages/Settings/Appearance/AppearanceSettings';
import { GetCurrentTheme } from './redux/reducers/Settings/SettingsSelector';

/*====================*/

const socket = io('http://localhost:1488', { transports: ['websocket'] });

const AppWithProvider: React.FC = function () {
  const isAuth = useSelector(GetAuthStatus);
  const currentTheme = useSelector(GetCurrentTheme);

  /*====================*/

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Auth());
    dispatch(ErrorActions.setError(null));
  }, []);

  /*====================*/

  return (
    <HashRouter>
      <div data-theme={currentTheme} className="app-container">
        {isAuth ? (
          <>
            <Header />
            <div className="flex-container wrapper">
              <Dialogs />
              <Switch>
                <Route path="/settings/appearance">
                  <AppearanceSettings />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/dialogs/:id">
                  <Index socket={socket} />
                </Route>
                <Route path="/">
                  <Redirect to="/dialogs/null" />
                </Route>
              </Switch>
            </div>
          </>
        ) : (
          <>
            <Header small />
            <Login />
          </>
        )}
        <Error />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </div>
    </HashRouter>
  );
};

/*====================*/

export default AppWithProvider;
