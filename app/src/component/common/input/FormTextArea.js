import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextArea from 'Component/common/input/TextArea';
import 'style-loader!Component/common/input/form-input.less';

class FormTextArea extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const labelColSpanClass = "col-xs-"+this.props.labelColSpan;
		const inputColSpanClass = "col-xs-"+(12-this.props.labelColSpan);
		return (
			<div className={"form-group swv-form-input"} style={{overflow:"hidden", height:"auto"}}>
				<label className={`${labelColSpanClass} control-label ellipsis`}>{this.props.labelTitle}</label>
				<div className={inputColSpanClass}>
					<TextArea
						id={this.props.id}
						name={this.props.name}
						text={this.props.text}
						rows={this.props.rows}
						className={this.props.className}
						placeholder={this.props.placeholder}
						disabled={this.props.disabled}
						maxLength={this.props.maxLength}
						readOnly={this.props.readOnly}
						style={this.props.style}
						autoFocus={this.props.autoFocus}
						onChange={this.props.onChange}
						attr={this.props.attr}
					/>
				</div>
			</div>
		);
	}
}

FormTextArea.defaultProps = {
	labelTitle: "No label",
	labelColSpan: 2
};

FormTextArea.propTypes = {
	labelTitle: PropTypes.string,
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

export default FormTextArea;