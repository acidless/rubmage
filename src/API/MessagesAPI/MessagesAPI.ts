import IMessage from '../../types/Content/IMessage';
import Http from '../Http';
import JSONResponse from '../../types/Response/ResponsesTypes';

/*====================*/

const MessagesAPI = {
  async sendMessage(message: IMessage): Promise<JSONResponse<undefined>> {
    return await Http.request('POST', '/api/messages', message);
  },
  async getMessages(dialog: string, page: number): Promise<JSONResponse<Array<IMessage>>> {
    return await Http.request('GET', `/api/dialogs/${dialog}/messages?p=${page}`);
  },
};

/*====================*/

export default MessagesAPI;
