import React, { useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUser } from '../../../redux/reducers/Auth/authSelector';
import Loader from '../../Loader/Loader';
import { GetCurrentDialogSelector } from '../../../redux/reducers/Dialogs/DialogsSelector';
import { GetCurrentDialog } from '../../../redux/reducers/Dialogs/DialogsReducer';
import WordEndingCreator from '../../../utils/WordEndingCreator';
import MessageForm from './MessageForm/MessageForm';
import Messages from './Messages/Messages';

/*====================*/

type PropsType = {
  socket: SocketIOClient.Socket;
};

/*====================*/

const Index: React.FC<PropsType> = function ({ socket }) {
  const currentUser = useSelector(GetCurrentUser);
  const currentDialog = useSelector(GetCurrentDialogSelector);

  /*====================*/

  const { id } = useParams();
  const dispatch = useDispatch();

  /*====================*/

  useEffect(() => {
    if (id !== 'null') {
      dispatch(GetCurrentDialog(id));
    }
  }, [id]);

  /*====================*/

  return (
    <div className="message-wrapper flex-container">
      {id === 'null' ? (
        <div className="message-wrapper__no-messages flex-container">
          <div className="flex-container">
            <span className="material-icons">chat_bubble_outline</span>
            <p>Начните новый диалог или откройте существующий</p>
          </div>
        </div>
      ) : currentUser ? (
        <>
          {currentDialog && (
            <div className="message-wrapper__current-dialog flex-container">
              <div className="current-dialog__info flex-container">
                <img src={currentDialog.photo} className="roundy-icon" alt="" />
                <p>{currentDialog.name}</p>
              </div>
              <p className="current-dialog__members">
                {new WordEndingCreator(currentDialog.members.length, 'участник').createEnding()}
              </p>
            </div>
          )}
          <Messages currentUser={currentUser} currentDialog={currentDialog} />
          <MessageForm socket={socket} id={id} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

/*====================*/

export default Index;
