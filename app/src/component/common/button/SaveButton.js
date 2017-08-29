import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingButton from 'Component/common/button/LoadingButton';
import 'style-loader!Component/common/button/button.less';
import 'style-loader!font-awesome/less/font-awesome.less';

class SaveButton extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<LoadingButton
				title="Save"
				loadingTitle="Please Wait.."
				className={`btn btn-primary ${this.props.className}`}
				style={this.props.style}
				isLoading={this.props.isLoading}
				onClick={this.props.onClick}
			/>
		);
	}
}

SaveButton.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	disabled:PropTypes.bool,
	onClick:PropTypes.func,
	isLoading:PropTypes.bool
};

SaveButton.defaultProps = {
	className:"",
	style:{},
	disabled:false,
	onClick:null,
	isLoading:false
};

export default SaveButton;