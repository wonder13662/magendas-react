import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'style-loader!font-awesome/less/font-awesome.less';

class Alert extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

		let classNameAlertType = "alert alert-warning";
		let typeName = null;
		if(this.props.success) {
			classNameAlertType = "alert alert-success";
			typeName = <i className="fa fa-check-circle" aria-hidden="true"></i>;
		} else if(this.props.info) {
			classNameAlertType = "alert alert-info";
			typeName = <i className="fa fa-info-circle" aria-hidden="true"></i>;
		} else if(this.props.warning) {
			classNameAlertType = "alert alert-warning";
			typeName = <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>;
		} else if(this.props.danger) {
			classNameAlertType = "alert alert-danger";
			typeName = <i className="fa fa-minus-circle" aria-hidden="true"></i>;
		}

		const classNameDismiss = (this.props.dismiss)?"alert-dismissible":"";
		const className = `swv-alert ${classNameAlertType} ${classNameDismiss} ${this.props.className}`;
		const style = Object.assign(this.props.style, {borderRadius:"0px",position:"relative"});

		return (
			<div className={className} role="alert" style={style}>
				{this.props.dismiss &&
				<button type="button" className="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
				}
				<div>{typeName}<span>&nbsp;{this.props.msg}</span>{this.props.children}</div>
			</div>
		);
	}
}

Alert.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	msg:PropTypes.string.isRequired,
	success:PropTypes.bool,
	info:PropTypes.bool,
	warning:PropTypes.bool,
	danger:PropTypes.bool,
	dismiss:PropTypes.bool,
};

Alert.defaultProps = {
	className:"",
	style:{},
	msg:"",
	success:false,
	info:false,
	warning:false,
	danger:false,
	dismiss:false,
};

export default Alert;