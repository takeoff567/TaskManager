import { combineReducers } from "@reduxjs/toolkit";
import slices from "./slices";

export default combineReducers({
    auth: slices.auth
});