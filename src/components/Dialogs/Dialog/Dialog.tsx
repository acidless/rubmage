import IDialog from '../../../types/Content/IDialog';
import React from 'react';
import './dialog.scss';
import { Link } from 'react-router-dom';

/*====================*/

function Dialog({ dialog }: { dialog: IDialog }) {
  return (
    <div className="dialog">
      <div className="dialog__avatar">
        <img className="roundy-icon" src={dialog.photo} alt="" />
      </div>
      <div className="dialog__name">
        <Link to={`/dialogs/${dialog._id}`}>{dialog.name || '228'}</Link>
      </div>
    </div>
  );
}

/*====================*/

export default Dialog;
