import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextArea extends Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(ev) {
		let userInput = ev.target.value;
		this.props.onChange({ userInput });
	}

	render() {
		const className = `input form-control ${this.props.className}`;

		return (
			<textarea
				id={this.props.id}
				name={this.props.name}
				value={this.props.text || ""}
				rows={this.props.rows}
				className={className}
				placeholder={this.props.placeholder}
				disabled={this.props.disabled}
				maxLength={this.props.maxLength}
				readOnly={this.props.readOnly}
				style={this.props.style}
				autoFocus={this.props.autoFocus}
				onChange={this.onChange}
				{...this.props.attr}
			/>
		);
	}
}
TextArea.defaultProps = {
	onChange: null,
	id: "",
	name: "",
	text: "",
	rows: "5",
	className: "",
	placeholder: "",
	disabled: false,
	maxLength: 10000,
	readOnly: false,
	style: {},
	autoFocus: false,
	attr: null
};

TextArea.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	rows: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	attr: PropTypes.object,
};

export default TextArea;