import { configureStore, combineReducers } from "@reduxjs/toolkit";
import addinguserinfo from "../Feature/addinguserinfo";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  User_info: addinguserinfo,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);
export default persistor;
