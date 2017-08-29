import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleDatePicker from 'Component/common/datepicker/SingleDatePicker';

import 'style-loader!Component/common/input/form-input.less';

class FormSingleDatePicker extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`form-group swv-form-input ${this.props.className}`}>
				<label className="col-xs-2 control-label ellipsis">{this.props.labelTitle}</label>
				<div className="col-xs-10">
					<SingleDatePicker
						date={this.props.date}
						onChange={this.props.onChange}
						style={this.props.style}
						placeholder={this.props.placeholder}
						disabled={this.props.disabled}
						readOnly={this.props.readOnly}
						displayFormat={this.props.displayFormat}
						attr={this.props.attr}
					/>
				</div>
			</div>
		);
	}
}

FormSingleDatePicker.defaultProps = {
	labelTitle:"No label",
	onChange:null,
	style:{},
	disabled:false,
	readOnly:false
};

FormSingleDatePicker.propTypes = {
	labelTitle:PropTypes.string,
	date:PropTypes.number,
	onChange:PropTypes.func,
	style:PropTypes.object,
	placeholder:PropTypes.string,
	disabled:PropTypes.bool,
	readOnly:PropTypes.bool,
	displayFormat:PropTypes.string,
	attr:PropTypes.object
};

export default FormSingleDatePicker;