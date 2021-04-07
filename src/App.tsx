import React from 'react';
import { render } from 'react-dom';
import Index from './components/pages/Messenger';
import Header from './components/Header/Header';
import './style/app.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppWithProvider from './AppWithProvider';

/*====================*/

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <Provider store={store}>
      <AppWithProvider />
    </Provider>
  );
};

render(<App />, mainElement);
