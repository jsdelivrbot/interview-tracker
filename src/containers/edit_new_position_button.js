import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { editNewPosition } from '../actions/index'

class EditNewPositionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler(e) {
    e.preventDefault()
    this.props.editNewPosition()
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickHandler.bind(this)}
        disabled={this.props.isEditingNewPosition}>
        Add New Position
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    isEditingNewPosition: state.ui.isEditingNewPosition
  }
}

export default connect(mapStateToProps, { editNewPosition })(EditNewPositionButton)
