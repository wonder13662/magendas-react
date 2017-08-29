import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';


class Select extends Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(event) {
		let selectedValue = isNaN(event.target.value)? event.target.value : Number(event.target.value);
		let selectedOption = _.find(this.props.options, (item) => `${item.value}` === `${selectedValue}`);

		this.props.onChange(selectedOption);
	}

	onBlur(event) {
		if(this.props.onBlur) {
			let selectedValue = isNaN(event.target.value)? event.target.value : Number(event.target.value);
			let selectedOption = _.findWhere(this.props.options, {value: selectedValue});
			this.props.onBlur(selectedOption);
		}
	}

	render() {
		const options = this.props.options && this.props.options.map((option, idx) => {
			return (
				<option key={option.value} value={option.value}>
					{option.title}
				</option>
			);
		});
		return (
			<select
				id={this.props.id}
				className={`input form-control ${this.props.className}`}
				onChange={this.onChange}
				onBlur={this.onBlur}
				disabled={this.props.disabled}
				readOnly={this.props.readOnly}
				ref={this.props.inputRef}
				style={this.props.style}
				value={(this.props.value === null || typeof this.props.value === 'undefined')?"":this.props.value}
				{...this.props.attr}
			>
				{this.props.placeholder &&
				<option value="" disabled>{this.props.placeholder}</option>
				}
				{options}
			</select>
		);
	}

}

Select.defaultProps = {
	id:"",
	className:"",
	style:{},
	onBlur:null,
	attr:null,
	options:[],
};

Select.propTypes = {
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	onBlur: PropTypes.func,
	attr: PropTypes.object,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired
	})),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Select;