import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'Component/common/input/Input';
import TextUtil from 'Util/TextUtil';

import 'style-loader!Component/common/input/form-input.less';

class FormInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "formInputParsely_" + TextUtil.getUniqueId()
        };
    }

    render() {
    	const labelColSpanClass = "col-xs-"+this.props.labelColSpan;
    	const inputColSpanClass = "col-xs-"+(12-this.props.labelColSpan);

        return (
            <div className={`form-group swv-form-input ${this.props.className}`}>
                <label className={`${labelColSpanClass} control-label ellipsis`}>{this.props.labelTitle}</label>
                <div className={inputColSpanClass}>
                    <Input
                        id={this.state.id}
						type={this.props.type}
                        text={this.props.text}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        style={this.props.style}
                        onChange={this.props.onChange}
                        onFilter={this.props.onFilter}
						onMouseDown={this.props.onMouseDown}
                        attr={this.props.attr}
                        inputRef={this.props.inputRef}
                    />
                </div>
            </div>
        );
    }
}

FormInput.defaultProps = {
	type:"text",
    className:"",
	labelTitle:"No label",
	labelColSpan: 2,
    text:"No name",
    placeholder:"Search Keyword",
    disabled:false,
    readOnly:false,
    style:{},
    onChange:null,
    onFilter:null,
	onMouseDown:null,
    attr:null,
};

FormInput.propTypes = {
	type:PropTypes.string,
	onChange:PropTypes.func.isRequired,
    className:PropTypes.string,
	labelTitle:PropTypes.string,
	labelColSpan: PropTypes.number,
    text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
    placeholder:PropTypes.string,
    disabled:PropTypes.bool,
    readOnly:PropTypes.bool,
    style:PropTypes.object,
    onFilter:PropTypes.func,
	onMouseDown:PropTypes.func,
    attr:PropTypes.object,
	inputRef: PropTypes.func
};

export default FormInput;