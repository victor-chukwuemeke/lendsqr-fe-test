import { createStore, applyMiddleware, Store, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from '../_redux/reducer'
import rootSaga from '../_redux/saga'
import { userConstants } from '../_constants'
import { composeWithDevTools } from '@redux-devtools/extension'

type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: userConstants.USER_STORE_KEY,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools || compose

const store: Store<RootState> = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)
export let persistor: Persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

store.dispatch({ type: userConstants.GET_ALL_USERS })

export default store
export const getStoreState = (): RootState => store.getState()
export const storeDispatch = (action: any): any => store.dispatch(action)
