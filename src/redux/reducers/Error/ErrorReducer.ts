import ActionsType from "../Types";
import { Reducer } from "redux";

const SET_ERROR = "Roxine/Error/SET-ERROR";

/*====================*/

const initState = {
  error: null as string | null,
};
type ErrorStateType = typeof initState;

/*====================*/

type Actions = ActionsType<typeof ErrorActions>;

/*====================*/

const ErrorReducer: Reducer<ErrorStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

/*====================*/

export const ErrorActions = {
  setError(error: string | null) {
    return <const>{ type: SET_ERROR, payload: { error } };
  },
};

/*====================*/

export default ErrorReducer;
