import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberUtil from 'Util/NumberUtil';

import 'style-loader!Component/common/input/currency-input.less';

class CurrencyInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userInput: NumberUtil.getDecimalFormat(props.amount),
		};

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({userInput: NumberUtil.getDecimalFormat(nextProps.amount)});
	}

	onChange(ev) {
		ev.stopPropagation();

		let userInput = ev.target.value;
		let prevUserInput = this.state.userInput;

		if("0.00" === prevUserInput) {
			userInput = userInput.replace(prevUserInput, "");
		}

		this.setState({userInput}, () => {
			if(this.props.onChange) {
				this.props.onChange({ userInput });
			}
		});
	}

	onBlur(ev) {
		ev.stopPropagation();
		const userInput = ev.target.value;
		let currencyFormat = NumberUtil.getDecimalFormat(userInput);

		if(0 < this.props.maxLength && this.props.maxLength < currencyFormat.length) {
			// 최대자리수보다 크다면 줄여준다.
			currencyFormat = currencyFormat.slice(currencyFormat.length - this.props.maxLength, currencyFormat.length);
			currencyFormat = NumberUtil.getDecimalFormat(currencyFormat);
		}

		this.setState({userInput: currencyFormat}, () => {
			this.props.onBlur({
				userInput: currencyFormat,
			});
		});
	}

	render() {
		const className = `swv-currency-input form-group ${this.props.className}`;

		let attr = this.props.attr || {};
		attr.disabled = this.props.disabled? "disabled" : "";
		const value = this.state.userInput || "";
		const styleInput = Object.assign({textAlign:"right"}, this.props.styleInput);
		const classNameInputSmall = (this.props.small)?"swv-currency-input-small":"";

		return (
			<div className={`${className} ${classNameInputSmall}`} style={this.props.style}>
				<label className="sr-only">{this.props.placeholder}</label>
				<div className={`input-group ${classNameInputSmall}`}>
					<div className={`input-group-addon ${classNameInputSmall}`}>{this.props.headTitle || this.props.currency}</div>
					<input
						type="text"
						className={this.props.headTitle?`form-control swv-currency-dual-input ${classNameInputSmall}`:`form-control ${classNameInputSmall}`}
						placeholder="Amount"
						value={value}
						onChange={this.onChange}
						onBlur={this.onBlur}
						style={styleInput}
						{...attr}
					/>
					{this.props.headTitle &&
					<div className="swv-currency-dual-tail">{this.props.currency}</div>
					}
				</div>
			</div>
		);
	}
}

CurrencyInput.propTypes = {
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

	small:PropTypes.bool,
	maxLength:PropTypes.number,
};

CurrencyInput.defaultProps = {
	className:"",
	style:{},
	styleInput:{},
	disabled:false,
	currency:"RM",
	placeholder:"Type amount",
	onChange:null,
	attr:null,
	small:false,
	maxLength:-1,
};

export default CurrencyInput;