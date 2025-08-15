
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "@/modules/auth/state/auth-state";


const rootReducer = combineReducers({
    auth: authSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
