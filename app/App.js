import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from './reducer';

const mapStateToProps = state => ({
  counterA: state.counterA,
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
          onClick={props.incrementA}
        >
          A: {props.counterA}
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={props.incrementB}
        >
          B: {props.counterB}
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={props.incrementC}
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
