import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';
//configure의 역할 - 스토어 생성.
const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

//개발 모드일때만 Redux Devtools를 적용합니다.
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;
//preloadedstate란? 추후 서버사이드 렌더링 시 전달받는 초기 상태
const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default configure;

/*
const sagaMiddleware=createSagaMiddleware();
const configure = createStore(reducers, applyMiddleware(saga));

sagaMiddleware.run();
*/