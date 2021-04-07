import React, { useEffect, useState } from 'react';
import './header.scss';
import * as electron from 'electron';

/*====================*/

type PropsType = {
  small?: boolean;
};

const Header: React.FC<PropsType> = function ({ small }) {
  const window = electron.remote.getCurrentWindow();
  const [isMaximized, setMaximized] = useState(window ? window.isMaximized() : false);

  useEffect(() => {
    const boundsString = localStorage.getItem('windowSize');
    if (boundsString) {
      const bounds = JSON.parse(boundsString);
      window.setSize(bounds.width, bounds.height);
    }
  }, []);

  useEffect(() => {
    const window = electron.remote.getCurrentWindow();
    if (window) {
      if (small) {
        window.setResizable(false);

        setImmediate(() => {
          window.setMinimumSize(300, 400);
          window.setSize(300, 400);
        });
      } else {
        window.setResizable(true);

        setImmediate(() => {
          window.setMinimumSize(800, 600);

          const boundsString = localStorage.getItem('windowSize');
          if (boundsString) {
            const bounds = JSON.parse(boundsString);
            window.setSize(bounds.width, bounds.height);
          }
        });
      }
    }
  }, [small]);

  useEffect(() => {
    window &&
      window.on('resize', () => {
        setMaximized(window.isMaximized());

        const { width, height } = window.getBounds();
        localStorage.setItem('windowSize', JSON.stringify({ width, height }));
      });
  }, [small]);

  /*====================*/

  function close() {
    window?.close();
  }

  function minimize() {
    window?.minimize();
  }

  function toggleMaximize() {
    if (isMaximized) {
      window.unmaximize();
    } else {
      window.maximize();
    }
    setMaximized(!isMaximized);
  }

  /*====================*/

  return (
    <header className="header">
      <div className="header__topbar flex-container">
        <div className="topbar__logo">
          <span>Rubmage</span>
        </div>
        <div className="topbar__buttons flex-container">
          <button onClick={minimize} className="flex-container topbar__button default-btn">
            <span className="material-icons">remove</span>
          </button>
          {!small && (
            <button onClick={toggleMaximize} className="flex-container topbar__button default-btn">
              <span className="material-icons">{isMaximized ? 'fullscreen_exit' : 'fullscreen'}</span>
            </button>
          )}

          <button onClick={close} className="flex-container topbar__button default-btn topbar__close-button">
            <span className="material-icons">close</span>
          </button>
        </div>
      </div>
    </header>
  );
};

/*====================*/

export default Header;
