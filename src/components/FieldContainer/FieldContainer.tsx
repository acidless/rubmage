import { Field } from 'formik';
import React, { useEffect, useState } from 'react';

/*====================*/

interface IFieldContainer {
  error?: string;
  touched?: boolean;
  value?: string;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  validate?: Function;
  readOnly?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
}

/*====================*/

const FieldContainer: React.FC<IFieldContainer> = function ({
  innerRef,
  children,
  error,
  touched,
  ...props
}) {
  const [isErrorShowing, toggleError] = useState(false);

  /*====================*/

  useEffect(() => {
    if (isErrorShowing) {
      setTimeout(() => {
        toggleError(false);
      }, 3000);
      return () => {
        toggleError(false);
      };
    }
  }, [isErrorShowing]);

  /*====================*/

  return (
    <div
      className={`${error && touched ? 'error ' : ''}${
        children ? 'padding ' : ''
      }input-wrapper`}
    >
      <Field innerRef={innerRef} {...props} />
      {children}
      {error && touched && (
        <>
          <button
            onClick={() => {
              toggleError(true);
            }}
            type="button"
            className="default-btn flex-container error-button"
          >
            <span className="material-icons">error_outline</span>
          </button>
          <div className={`${isErrorShowing ? 'active ' : ''}error-block`}>
            {error}
          </div>
        </>
      )}
    </div>
  );
};

/*====================*/

export default FieldContainer;
