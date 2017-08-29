import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'Component/common/input/CurrencyInput';
import 'style-loader!Component/common/input/form-input.less';

class FormCurrencyInput extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const labelColSpanClass = "col-xs-"+this.props.labelColSpan;
		const inputColSpanClass = "col-xs-"+(12-this.props.labelColSpan);
		return (
			<div className={"form-group swv-form-input"}>
				<label className={`${labelColSpanClass} control-label ellipsis`}>{this.props.labelTitle}</label>
				<div className={inputColSpanClass}>
					<CurrencyInput
						onBlur={this.props.onBlur}
						className={this.props.className}
						style={this.props.style}
						styleInput={this.props.styleInput}
						disabled={this.props.disabled}
						currency={this.props.currency}
						placeholder={this.props.placeholder}
						amount={this.props.amount}
						onChange={this.props.onChange}
						headTitle={this.props.headTitle}
						attr={this.props.attr}
					/>
				</div>
			</div>
		);
	}
}


FormCurrencyInput.defaultProps = {
	labelTitle: "No label",
	labelColSpan: 2
};

FormCurrencyInput.propTypes = {
	labelTitle: PropTypes.string,
	onBlur:PropTypes.func.isRequired,
	className:PropTypes.string,
	style:PropTypes.object,
	styleInput:PropTypes.object,
	disabled:PropTypes.bool,
	currency:PropTypes.string,
	placeholder:PropTypes.string,
	amount:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange:PropTypes.func,
	headTitle: PropTypes.string,
	attr:PropTypes.object,
};

export default FormCurrencyInput;