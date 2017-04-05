import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { addPosition } from '../actions/position'
import { cancelEditNewPosition } from '../actions/index'

class NewPositionEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      companyName: '',
      position: ''
    };
  }

  handleCompanyNameChange(e) {
    this.setState({
      ...this.state,
      companyName: e.target.value
    });
  }

  handlePositionChange(e) {
    this.setState({
      ...this.state,
      position: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.addPosition(this.state.companyName, this.state.position)
  }

  onCancel(e) {
    this.props.cancelEditNewPosition()
  }

  render() {
    return (
      <div className="cell">
        <div>
          <span className="cell-title">Position Details</span>
        </div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Company</label>
            <input className="form-control" value={this.state.companyName} onChange={this.handleCompanyNameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label className="control-label">Position</label>
            <input className="form-control" value={this.state.position} onChange={this.handlePositionChange.bind(this)} />
          </div>
          <div className="flex jc-flex-end">
            <button
              type="button"
              onClick={this.onCancel.bind(this)}
              className="btn btn-default">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary save-position"
              disabled={!this.state.companyName.length || !this.state.position.length}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addPosition, cancelEditNewPosition })(NewPositionEditForm)
