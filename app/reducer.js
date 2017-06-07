import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const types = {
  INCREMENT: 'INCREMENT',
  TOGGLE_COLOR: '@@A/TOGGLE_COLOR',
};

const createCounterWithNamedType = (counterName = '') => (
  (state = 0, action) => {
    if (action.name !== counterName) return state;
    switch (action.type) {
      case types.INCREMENT:
        return state + 1;
      default:
        return state;
    }
  }
);

const color = (state = true, action) => {
  switch (action.type) {
    case types.TOGGLE_COLOR:
      return !state;
    default:
      return state;
  }
};

const reducerA = combineReducers({
  count: createCounterWithNamedType('A'),
  color,
});

const rootReducer = combineReducers({
  counterA: reducerA,
  counterB: createCounterWithNamedType('B'),
  counterC: createCounterWithNamedType('C'),
  routing: routerReducer,
});

// const createCounterWithNamedType = (counterName = '') => (
//   (state = 0, action) => {
//     switch (action.type) {
//       case `@@${counterName}/INCREMENT`:
//         return state + 1;
//       default:
//         return state;
//     }
//   }
// );
//
// const rootReducer = combineReducers({
//   counterA: createCounterWithNamedType('A'),
//   counterB: createCounterWithNamedType('B'),
//   counterC: createCounterWithNamedType('C'),
//   routing: routerReducer,
// });

// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     default:
//       return state;
//   }
// };
//
// const rootReducer = combineReducers({
//   counterA: counter,
//   counterB: counter,
//   counterC: counter,
//   routing: routerReducer,
// });

export default rootReducer;

const makeActionCreator = (type, ...argNames) => (
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => action[argNames[index]] = args[index]);
    return action;
  }
);

export const actions = {
  increment: makeActionCreator(types.INCREMENT, 'name', 'id', 'test'),
  toggleColor: makeActionCreator(types.TOGGLE_COLOR),
};

// export const actions = {
//   increment: name => ({
//     type: 'INCREMENT',
//     name,
//   }),
//
//   toggleColor: () => ({
//     type: '@@A/TOGGLE_COLOR',
//   }),
// };
