import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import SvgRoot from './SvgRoot';

function mapStateToProps(reduxState) {
  return {
    state: reduxState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SvgRoot);