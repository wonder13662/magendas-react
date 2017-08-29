import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-month-picker';
import 'style-loader!react-month-picker/css/month-picker.css';
import 'style-loader!./month-range-picker.less';

/*
 @ home : https://github.com/nickeljew/react-month-picker/
 @ npm : https://www.npmjs.com/package/react-month-picker
 */

export default class MonthRangePicker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: "Select range(month-month)"
		};
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	onClick(ev) {
		this.refs.pickRange.show();
	}

	render() {
		const className = `month-range-picker swv-month-range-picker ${this.props.className}`;
		return (
			<div className={className} style={this.props.style}>
				<Picker
					ref="pickRange"
					years={this.props.years}
					range={this.props.range}
					lang={this.props.lang}
					theme={this.props.theme}
					onChange={this.props.onChange}
					onDismiss={this.props.onDismiss}>
					<div className="box" onClick={this.onClick}>
						{
							this.props.range?(("0" + this.props.range.from.month).slice(-2)+"/"+this.props.range.from.year+
							" ~ "+("0"+this.props.range.to.month).slice(-2)+"/"+this.props.range.to.year):"Select range"
						}
					</div>
				</Picker>
			</div>
		);
	}
}

MonthRangePicker.defaultProps = {
	theme:"light",
	years:10
};

MonthRangePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func,
	onDismiss: PropTypes.func,
	lang: PropTypes.object,
	theme: PropTypes.string,
	range: PropTypes.object,
	years: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.number,
		PropTypes.object
	])
};