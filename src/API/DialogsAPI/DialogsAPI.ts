import Http from '../Http';
import JSONResponse from '../../types/Response/ResponsesTypes';
import IDialog from '../../types/Content/IDialog';

/*====================*/

const DialogsAPI = {
  async getDialogs(): Promise<JSONResponse<Array<IDialog>>> {
    return await Http.request('GET', '/api/dialogs');
  },

  async getDialog(id: string): Promise<JSONResponse<IDialog>> {
    return await Http.request('GET', `/api/dialogs/${id}`);
  },
};

/*====================*/

export default DialogsAPI;
