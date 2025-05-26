import { AnyAction, configureStore, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistReducer, persistStore } from 'redux-persist';
import { reduxStorage } from "../lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    stateReconciler: hardSet
}

export type RootReducer = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootReducer, AnyAction>(persistConfig, rootReducer);

const logger: Middleware = (store: MiddlewareAPI<any, any>) => (next: (action: unknown) => unknown) => (action: unknown) => {
    console.log('🛠️ Logger Middleware');
    console.log('Store state before:', store.getState());
    console.log('Action:', action);
  
    const result = next(action);
  
    console.log('Store state after:', store.getState());
    return result;
  };
  

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export default{ store, persistor };