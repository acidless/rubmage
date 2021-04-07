import React, { useEffect, useState } from 'react';
import './dialogs.scss';
import Menu from './Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { GetDialogs } from '../../redux/reducers/Dialogs/DialogsReducer';
import { GetDialogsSelector } from '../../redux/reducers/Dialogs/DialogsSelector';
import Dialog from './Dialog/Dialog';
import { GetCurrentUser } from '../../redux/reducers/Auth/authSelector';

function Dialogs() {
  const dialogsMenu = React.useRef(null);
  const [isMenuActive, setMenuActive] = useState(false);
  const dialogs = useSelector(GetDialogsSelector);
  const currentUser = useSelector(GetCurrentUser);

  const userId = currentUser ? currentUser._id : null;

  /*====================*/

  const dispatch = useDispatch();

  /*====================*/

  useEffect(() => {
    if (userId) {
      dispatch(GetDialogs());
    }
  }, [userId]);

  /*====================*/

  function resizeDialogs() {
    if (dialogsMenu.current) {
      document.onmousemove = function (e) {
        document.defaultView.getSelection().removeAllRanges();
        dialogsMenu.current.style.width = `${e.x}px`;
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }

  /*====================*/

  return (
    <>
      <div ref={dialogsMenu} className="dialogs">
        <div onMouseDown={resizeDialogs} className="dialogs__drag" />
        <div className="dialogs__navigate flex-container">
          <button
            onClick={() => {
              setMenuActive(true);
            }}
            className="default-btn flex-container"
          >
            <span className="material-icons">menu</span>
          </button>
          <input className="dialogs__search" type="text" />
        </div>
        <hr />
        {dialogs && (
          <div className="dialogs__dialogs">
            {dialogs.map((dialog) => {
              return <Dialog key={dialog._id} dialog={dialog} />;
            })}
          </div>
        )}
      </div>
      <Menu isActive={isMenuActive} setActive={setMenuActive} />
    </>
  );
}

/*====================*/

export default Dialogs;
