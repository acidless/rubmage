import { Selector } from "react-redux";
import { AppStateType } from "../../store";

export const GetErrorState: Selector<AppStateType, { error: string | null }> = (state) => state.error;
