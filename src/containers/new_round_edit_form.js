import React, {PropTypes} from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { addRound } from '../actions/round'

class NewRoundEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: '',
      date: '',
      startTime: '',
      endTime: '',
    };
  }

  handleTypeChange(e) {
    this.setState({ ...this.state, type: e.target.value });
  }

  handleDateChange(e) {
    this.setState({ ...this.state, date: e.target.value });
  }

  handleStartTimeChange(e) {
    this.setState({ ...this.state, startTime: e.target.value });
  }

  handleEndTimeChange(e) {
    this.setState({ ...this.state, endTime: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
    const start = moment(`${this.state.date} ${this.state.startTime}`, 'MM/DD/YYYY hh:mm a')
    const end = moment(`${this.state.date} ${this.state.endTime}`, 'MM/DD/YYYY hh:mm a')
    this.props.addRound(this.props.positionId, this.state.type, start.unix() * 1000, end.unix() * 1000)
  }

  render() {
    return (
      <div className="cell">
        <div>
          <span className="cell-title">Interview Round Details</span>
        </div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Type</label>
            <input className="form-control" value={this.state.type} onChange={this.handleTypeChange.bind(this)} />
          </div>
          <div className="row">
            <div className="col-xs-6">
              <div className="form-group">
                <label className="control-label">Date</label>
                <input className="form-control" value={this.state.date} onChange={this.handleDateChange.bind(this)} />
              </div>
            </div>
            <div className="col-xs-3">
              <div className="form-group">
                <label className="control-label">Start</label>
                <input className="form-control" value={this.state.startTime} onChange={this.handleStartTimeChange.bind(this)} />
              </div>
            </div>
            <div className="col-xs-3">
              <div className="form-group">
                <label className="control-label">End</label>
                <input className="form-control" value={this.state.endTime} onChange={this.handleEndTimeChange.bind(this)} />
              </div>
            </div>
          </div>
          <div className="flex jc-flex-end">
            <button
              type="button"
              onClick={this.props.onCancel}
              className="btn btn-default">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary next"
              disabled={!this.state.type.length || !this.state.date.length || !this.state.startTime.length || !this.state.endTime.length}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addRound })(NewRoundEditForm)
