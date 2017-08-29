import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import pickadate from 'pickadate';
import 'style-loader!./single-date-picker.less';
import 'style-loader!Pickatheme/classic.css';
import 'style-loader!Pickatheme/classic.date.css';

/*
 @ home : http://amsul.ca/pickadate.js/
 @ npm : https://www.npmjs.com/package/pickadate
 */

class SingleDatePicker extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.prevDate = null;
		if(this.inputEl) {
			let $datePicker =
				$(this.inputEl).pickadate({
					format: this.props.displayFormat,
					selectYears: this.props.selectYears, // max - min 보다 커야 의미 있음
					min: this.props.minDate,
					max: this.props.maxDate,
					selectMonths: true,
					onSet: (context) => {
						if(this.props.onChange && context.select) {
							this.props.onChange(context.select);
						}
					},
				});
			this.datePicker = $datePicker.pickadate('picker');
			if (this.props.date) {
				this.datePicker.set('select', this.props.date);
			}
		}
	}

	componentDidUpdate() {
		if(this.inputEl) {
			$(this.inputEl).pickadate();
			if (this.prevDate !== this.props.date) {
				this.datePicker.set('select', this.props.date);
				this.prevDate = this.props.date;
			}
		}
	}

	render() {
		const className = `single-date-picker swv-single-date-picker ${this.props.className}`;
		const editableStyle = {backgroundColor:"white"};
		return (
			<div className={className} style={this.props.style}>
				<input
					type="text"
					className="form-control"
					ref={el => this.inputEl = el}
					disabled={this.props.disabled}
					readOnly={this.props.readOnly}
					placeholder={this.props.placeholder}
					style={!this.props.disabled?editableStyle:null}
					{...this.props.attr}
				/>
			</div>
		);
	}
}

SingleDatePicker.defaultProps = {
	className:"",
	style:{},
	onChange:null,
	disabled:false,
	readOnly:false,
	displayFormat:"dd mmmm, yyyy",
	selectYears:100,
	minDate:new Date(1900, 0, 1),
	maxDate:new Date(2100, 0, 1),
	placeholder:"Select date",
	attr:null
};

SingleDatePicker.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	onChange:PropTypes.func,
	date:PropTypes.number,
	disabled:PropTypes.bool,
	readOnly:PropTypes.bool,
	displayFormat:PropTypes.string,
	selectYears:PropTypes.number,
	minDate:PropTypes.object,
	maxDate:PropTypes.object,
	placeholder:PropTypes.string,
	attr:PropTypes.object
};

export default SingleDatePicker;