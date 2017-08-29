import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberUtil from 'Util/NumberUtil';

import 'style-loader!Component/common/input/days-input.less';

class DaysInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userInput: NumberUtil.getDecimalFormatDays(props.days),
		};

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({userInput: NumberUtil.getDecimalFormatDays(nextProps.days)});
	}

	onChange(ev) {
		ev.stopPropagation();

		let userInput = ev.target.value;

		// 입력가능한 범위를 제한합니다. 숫자, 소수점.
		userInput = userInput.replace(/[^0-9\\.]/gi,"");

		if(this.props.prorateBasis < Number(userInput)) {
			userInput = `${this.props.prorateBasis}`;
		} else if(Number(userInput) < 0) {
			userInput = 0;
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

		// TODO : 소수점을 안정적으로 계산하는 라이브러리가 필요.
		// 0.1, 0.6 처리
		const num = Number(userInput);
		const integer = parseInt(num);
		const decimal = num - integer;
		const decimal1Digit = (Math.round(parseInt(decimal * 100)/10))/10; // 소수점 2자리 남김
		let result = integer;

		if(0 < decimal1Digit && decimal1Digit < 0.3) {
			result += 0;
		} else if(0.2 < decimal1Digit && decimal1Digit < 0.8) {
			result += 0.5;
		} else if(0.7 < decimal1Digit && decimal1Digit < 1) {
			result += 1;
		}

		this.setState({ userInput }, () => {
			this.props.onBlur({
				userInput:result,
			});
		});
	}

	render() {
		const className = `swv-days-input form-group ${this.props.className}`;

		let attr = this.props.attr || {};
		attr.disabled = this.props.disabled? "disabled" : "";
		const value = this.state.userInput || "";
		const styleInput = Object.assign({textAlign:"right"}, this.props.styleInput);
		const classNameInputSmall = (this.props.small)?"swv-days-input-small":"";

		return (
			<div className={`${className} ${classNameInputSmall}`} style={this.props.style}>
				<label className="sr-only">{this.props.placeholder}</label>
				<div className={`input-group ${classNameInputSmall}`}>
					<input
						type="text"
						className={this.props.headTitle?`form-control swv-days-dual-input ${classNameInputSmall}`:`form-control ${classNameInputSmall}`}
						placeholder="0.0"
						value={value}
						onChange={this.onChange}
						onBlur={this.onBlur}
						style={styleInput}
						{...attr}
					/>
					<span className="input-group-addon">days</span>
				</div>
			</div>
		);
	}
}

DaysInput.propTypes = {
	onBlur:PropTypes.func.isRequired,
	className:PropTypes.string,
	style:PropTypes.object,
	styleInput:PropTypes.object,
	disabled:PropTypes.bool,
	placeholder:PropTypes.string,
	days:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange:PropTypes.func,
	headTitle: PropTypes.string,
	attr:PropTypes.object,
	small:PropTypes.bool,
	prorateBasis:PropTypes.number,
};

DaysInput.defaultProps = {
	className:"",
	style:{},
	styleInput:{},
	disabled:false,
	placeholder:"",
	onChange:null,
	attr:null,
	small:false,
	prorateBasis:31,
	value:"0.0",
};

export default DaysInput;