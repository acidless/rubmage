import { Action } from 'redux';
import { ErrorActions } from './Error/ErrorReducer';

/*====================*/

type ObjValuesType<Obj> = Obj extends { [key: string]: infer U } ? U : never;

type ActionsType<Obj extends ActionType> = ReturnType<ObjValuesType<Obj>>;

type ActionType = {
  [key: string]: (...args: any) => Action<string>;
};

export type DispatchActions<T> = T | ActionsType<typeof ErrorActions>;

/*====================*/

export default ActionsType;
