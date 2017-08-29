import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextUtil from 'Util/TextUtil';
import 'style-loader!./button.less';

class LoadingButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const title = this.props.isLoading? (this.props.loadingTitle === null ? "Loading" : this.props.loadingTitle) : this.props.title;
        const spinnerStyle = {
            display: this.props.isLoading? "inline-block" : "none",
            "marginLeft": (TextUtil.isEmpty(title))?"0px":"10px",
        };

        let opts = {};
        opts.disabled = this.props.isLoading? "disabled" : "";

        if(this.props.disabled) {
			opts.disabled = "disabled";
		}

        return (
            <button className={this.props.className}
					style={this.props.style}
					type={this.props.type}
					onClick={this.props.onClick} {...opts}>
				{this.props.children}
				{title}
				<i className="fa fa-circle-o-notch fa-spin" style={spinnerStyle}/>
            </button>
        );
    }
}

LoadingButton.defaultProps = {
    className: '', // (Loading Button Class)
    style: {}, // (Loading Button Style)
    isLoading: false,
    loadingTitle: '',
    type:'',
	title:'',
    onClick:null,
	disabled:false,
};

LoadingButton.propTypes = {
	className: PropTypes.string, // (Loading Button Class)
	style: PropTypes.object, // (Loading Button Style)
    isLoading: PropTypes.bool,
	loadingTitle: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

export default LoadingButton;