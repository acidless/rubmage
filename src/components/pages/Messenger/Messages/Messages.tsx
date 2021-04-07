import Loader from '../../../Loader/Loader';
import Message from '../../../Message/Message';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentMessages, GetMessagesLoadingStatus } from '../../../../redux/reducers/Messages/MessagesSelector';
import IMessage from '../../../../types/Content/IMessage';
import IUser from '../../../../types/Content/IUser';
import { GetMessages } from '../../../../redux/reducers/Messages/MessagesReducer';
import IDialog from '../../../../types/Content/IDialog';

/*====================*/

type PropsType = {
  currentUser: IUser | null;
  currentDialog: IDialog | null;
};

/*====================*/

const Messages: React.FC<PropsType> = function ({ currentUser, currentDialog }) {
  const isLoading = useSelector(GetMessagesLoadingStatus);
  const currentMessages = useSelector(GetCurrentMessages);
  const [currentPage, setPage] = useState(1);

  /*====================*/

  const userId = currentUser ? currentUser._id : null;
  const dialogId = currentDialog ? currentDialog._id : null;
  const dialogScroller = useRef(null);
  const dispatch = useDispatch();

  /*====================*/

  useEffect(() => {
    if (dialogId) {
      dispatch(GetMessages(currentPage));
    }
  }, [userId, dialogId, currentPage]);

  useEffect(() => {
    if (dialogScroller.current) {
      dialogScroller.current.onscroll = function (e) {
        if (e.target.scrollTop === 0) {
          setPage(currentPage + 1);

          dialogScroller.current.onscroll = null;
        }
      };
    }
  }, [dialogScroller.current, currentPage]);

  useEffect(() => {
    if (currentMessages.length > 0 && currentPage === 1) {
      dialogScroller.current.scrollTo(0, dialogScroller.current.scrollHeight);
    }
  }, [currentMessages.length, currentPage]);

  /*====================*/

  function sortByDate(a: IMessage, b: IMessage) {
    // @ts-ignore
    return new Date(a.sendAt) - new Date(b.sendAt);
  }

  /*====================*/

  return (
    <div ref={dialogScroller} className="message-wrapper__messages flex-container">
      {isLoading && <Loader />}
      {currentMessages.sort(sortByDate).map((message) => {
        return <Message key={message._id} isSelfSended={message.sender === currentUser._id} message={message} />;
      })}
    </div>
  );
};

/*====================*/

export default Messages;
