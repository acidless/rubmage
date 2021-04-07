import React, { useState } from 'react';
import './Checkbox.scss';

/*====================*/

type PropsType = {
  checked?: boolean;
  onChange?: (value: boolean) => any;
};

/*====================*/

const Checkbox: React.FC<PropsType> = function ({ checked, onChange }) {
  const [isChecked, setChecked] = useState(!!checked);

  /*====================*/

  function change() {
    onChange(!isChecked);
    setChecked(!isChecked);
  }

  return (
    <div className={`${isChecked ? 'checked' : 'unchecked'} checkbox`}>
      <input onChange={change} type="checkbox" checked={isChecked} />
      <div onClick={change} className="checkbox__value"></div>
    </div>
  );
};

/*====================*/

export default Checkbox;
