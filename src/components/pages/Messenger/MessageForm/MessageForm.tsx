import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { MessagesActions, SendMessage } from '../../../../redux/reducers/Messages/MessagesReducer';
import { useDispatch } from 'react-redux';
import IMessage from '../../../../types/Content/IMessage';

/*====================*/

type PropsType = {
  socket: SocketIOClient.Socket;
  id: string;
};

/*====================*/

const MessageForm: React.FC<PropsType> = function ({ socket, id }) {
  const dispatch = useDispatch();

  /*====================*/

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: IMessage) => {
        dispatch(MessagesActions.addMessage(message));
      });
    }
  }, []);

  /*====================*/

  async function messageFormSubmit(values: any) {
    values.message = values.message.trim();

    if (socket && values.message) {
      const message = { text: values.message, dialog: id, sendAt: new Date(Date.now()) };

      socket.emit('message', message);
      dispatch(SendMessage(message));
      values.message = '';
    }
  }

  /*====================*/

  return (
    <Formik onSubmit={messageFormSubmit} initialValues={{ message: '' }}>
      {({ handleSubmit, values }) => {
        return (
          <Form className="message-form flex-container" onSubmit={handleSubmit}>
            <Field value={values.message} name="message" placeholder="Напишите сообщение..." />
            <button className="message-form__send flex-container">
              <span className="material-icons">send</span>
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

/*====================*/

export default MessageForm;
