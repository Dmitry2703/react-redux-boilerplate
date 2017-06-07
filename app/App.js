import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from './reducer';

const mapStateToProps = state => ({
  counterA: state.counterA.count,
  colorA: state.counterA.color ? 'white' : '#ccc',
  counterB: state.counterB,
  counterC: state.counterC,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

const App = props => (
  <div>
    <h1>Higher-order reducer example</h1>
    <ul className="counters">
      <li>
        <button
          type="button"
          style={{ background: props.colorA }}
          onClick={() => props.increment('A')}
          onMouseOver={props.toggleColor}
          onMouseLeave={props.toggleColor}
        >
          A: {props.counterA}
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => props.increment('B')}
        >
          B: {props.counterB}
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => props.increment('C')}
        >
          C: {props.counterC}
        </button>
      </li>
    </ul>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
