import React, {PropTypes} from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { receiveOffer } from '../actions/offer'
import CurrencyInput from 'react-currency-input';

class NewOfferEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      baseSalary: 0,
    };
  }

  handleBaseSalaryChange(value) {
    this.setState({ baseSalary: value });
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
    this.props.receiveOffer(this.props.positionId, this.state.baseSalary.slice(1).replace(/,/g , ""))
  }

  render() {
    return (
      <div className="cell">
        <div>
          <span className="cell-title">Offer Details</span>
        </div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Base Salary</label>
            <CurrencyInput className="form-control" prefix="$" precision={0} value={this.state.baseSalary} onChange={this.handleBaseSalaryChange.bind(this)} />
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
              className="btn btn-primary money"
              disabled={!this.state.baseSalary.length}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { receiveOffer })(NewOfferEditForm)
