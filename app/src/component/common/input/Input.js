import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from 'Util/Const';
import 'style-loader!Component/common/input/input.less';

const { CSS_TEXT_ALIGN } = Const;

class Input extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
		this.getClassNameTextAlign = this.getClassNameTextAlign.bind(this);
	}

	getClassNameTextAlign() {
		if(this.props.left) {
			return CSS_TEXT_ALIGN.LEFT;
		} else if(this.props.center) {
			return CSS_TEXT_ALIGN.CENTER;
		} else if(this.props.right) {
			return CSS_TEXT_ALIGN.RIGHT;
		}
		return CSS_TEXT_ALIGN.LEFT;
	}

	onChange(ev) {
        let userInput = ev.target.value;
		if(this.props.onFilter) {
			// onFilter callback이 있다면 결과를 받아옵니다.
			userInput = this.props.onFilter({ userInput });
		}
		if(this.props.onChange) {
			this.props.onChange({ event:ev, userInput });
		}
    }

	onBlur(ev) {
		let userInput = ev.target.value;
		if(this.props.onBlurFilter) {
			userInput = this.props.onBlurFilter({ userInput });
		}
		if(this.props.onBlur) {
			this.props.onBlur({ userInput });
		}
	}

    render() {
		const classNameTextAlign = this.getClassNameTextAlign();
    	const className = `swv-input input form-control ${this.props.className} ${classNameTextAlign}`;

        return (
            <input
                id={this.props.id}
                type={this.props.type}
                className={className}
                value={this.props.text || ""}
                placeholder={this.props.placeholder}
                onChange={this.onChange}
                onBlur={this.onBlur}
				onMouseDown={this.props.onMouseDown}
				onKeyDown={this.props.onKeyDown}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
				ref={this.props.inputRef}
                style={this.props.style}
                {...this.props.attr}
            />
        );
    }
}

Input.defaultProps = {
	type: "text",
    className: "",
    text:"No name",
    placeholder:"Search Keyword",
    disabled:false,
    readOnly:false,
    style:{},
    onChange:null,
    onFilter:null,
    onBlur:null,
	onBlurFilter:null,
	onKeyDown:null,
	onMouseDown:null,
	inputRef:null,
    attr:null,
};

Input.propTypes = {
	onChange:PropTypes.func.isRequired,
    id: PropTypes.string,
	type: PropTypes.string,
    className:PropTypes.string,
    text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	placeholder:PropTypes.string,
    disabled:PropTypes.bool,
    readOnly:PropTypes.bool,
    style:PropTypes.object,
    onFilter:PropTypes.func,
    onBlur:PropTypes.func,
	onBlurFilter:PropTypes.func,
	onMouseDown:PropTypes.func,
	onKeyDown:PropTypes.func,
	inputRef:PropTypes.func,
    attr:PropTypes.object,
	left:PropTypes.bool,
	center:PropTypes.bool,
	right:PropTypes.bool,
};

export default Input;