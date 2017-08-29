import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Component/common/button/Button';
import 'style-loader!Component/common/button/button.less';
import 'style-loader!font-awesome/less/font-awesome.less';

class RemoveButton extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<Button
				className={"btn btn-danger"}
				style={this.props.style}
				disabled={this.props.disabled}
				onClick={this.props.onClick}
				title={" Remove"}
			>
				<i className="fa fa-trash-o"></i>
			</Button>
		);
	}
}

RemoveButton.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	disabled:PropTypes.bool,
	onClick:PropTypes.func,
};

RemoveButton.defaultProps = {
	className:"",
	style:{},
	disabled:false,
	onClick:null,
};

export default RemoveButton;