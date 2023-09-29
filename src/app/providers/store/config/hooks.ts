import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => ThunkDispatch<RootState, undefined, AnyAction> = useDispatch;
