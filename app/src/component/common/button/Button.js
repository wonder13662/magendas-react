import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextUtil from 'Util/TextUtil';
import 'style-loader!./button.less';

class Button extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.getClassNameDim = this.getClassNameDim.bind(this);
    }

    onClick(event) {
        if(!!this.props.onClick && !this.props.disabled && !this.props.invisible) {
            this.props.onClick(event);
        }
    }

    getClassNameDim() {
		if(TextUtil.isEmpty(this.props.classNameDim)) {
			return "swv-btn " + this.props.className;
		}
		return "swv-btn " + this.props.classNameDim;
	}

    render() {

        // Btn Disbled 경우의 사용자 지정 색상 표시
		const className = "swv-btn " + this.props.className;
		const classNameDim = this.getClassNameDim();
        const classNameOnView = (this.props.disabled)? classNameDim : className;

        let style = this.props.style? Object.assign({}, this.props.style) : {};
        if(this.props.disabled) {
			style['cursor'] = "not-allowed";
        }else {
			style['opacity']= this.props.invisible? 0 : 1;
			style['cursor'] = this.props.invisible? "default" : "pointer";
		}

        return (
            <button
                className={classNameOnView}
                style={style}
                onClick={this.onClick}
                ref={(button) => { this.nodeBtn = button; }}
                disabled={this.props.disabled}
				{...this.props.attr}
			>
                {this.props.children}
				{this.props.title}
            </button>
        );
    }
}

Button.defaultProps = {
    className: "",
	classNameDim: "",
	style: {},
	onClick: null,
    invisible: false,
    disabled: false,
	attr: {}
};

Button.propTypes = {
    className: PropTypes.string,
	classNameDim: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    invisible: PropTypes.bool,
    disabled: PropTypes.bool,
	title: PropTypes.string,
	attr: PropTypes.object,
};

export default Button;