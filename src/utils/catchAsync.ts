import { Dispatch } from 'redux';

type Thunk = (dispatch: Dispatch<any>, getState?: any) => void;

/*====================*/

export default function catchThunk(fn: Thunk, getState?: any) {
  return function (dispatch, getState) {
    try {
      fn(dispatch, getState);
    } catch (e) {
      console.error(e);
    }
  };
}
