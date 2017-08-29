import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'Component/common/input/Select';
import 'style-loader!Component/common/input/form-input.less';

class FormSelect extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const labelColSpanClass = "col-xs-"+this.props.labelColSpan;
		const inputColSpanClass = "col-xs-"+(12-this.props.labelColSpan);
		return (
			<div className={`form-group swv-form-input ${this.props.className}`} style={this.props.style}>
				<label className={`${labelColSpanClass} control-label ellipsis`}>{this.props.labelTitle}</label>
				<div className={inputColSpanClass}>
					<Select
						className={this.props.className}
						onChange={this.props.onChange}
						placeholder={this.props.placeholder}
						disabled={this.props.disabled}
						readOnly={this.props.readOnly}
						options={this.props.options}
						value={this.props.value}
						attr={this.props.attr}
					/>
				</div>
			</div>
		);
	}
}

FormSelect.defaultProps = {
	className:"",
	labelTitle:"No label",
	labelColSpan: 2,
	disabled:false,
	readOnly:false,
	style:{},
	onChange:null,
	attr:null,
	defaultOption:null,
	options:[],
};

FormSelect.propTypes = {
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	labelTitle: PropTypes.string,
	labelColSpan: PropTypes.number,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	attr: PropTypes.object,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired
	})),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormSelect;