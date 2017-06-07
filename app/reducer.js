import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const createCounterWithNamedType = (counterName = '') => (
  (state = 0, action) => {
    switch (action.type) {
      case `@@${counterName}/INCREMENT`:
        return state + 1;
      default:
        return state;
    }
  }
);

const rootReducer = combineReducers({
  counterA: createCounterWithNamedType('A'),
  counterB: createCounterWithNamedType('B'),
  counterC: createCounterWithNamedType('C'),
  routing: routerReducer,
});

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

export const actions = {
  incrementA: () => ({
    type: '@@A/INCREMENT',
  }),

  incrementB: () => ({
    type: '@@B/INCREMENT',
  }),

  incrementC: () => ({
    type: '@@C/INCREMENT',
  }),
};
