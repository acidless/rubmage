import IMessage from '../../types/Content/IMessage';
import React from 'react';
import './message.scss';

/*====================*/

type PropsType = {
  message: IMessage;
  isSelfSended?: boolean;
};

/*====================*/

const Message: React.FC<PropsType> = function ({ isSelfSended, message }) {
  return (
    <div className={`${isSelfSended ? 'right' : 'left'} message`}>
      <p>{message.text}</p>
      <time>{new Date(message.sendAt).toLocaleTimeString().slice(0, 5)}</time>
    </div>
  );
};

/*====================*/

export default Message;
