import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Component/common/button/Button';
import 'style-loader!Component/common/button/button.less';

class CancelButton extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const className = `btn btn-default ${this.props.className}`;

		return (
			<Button
				className={className}
				classNameDim={""}
				style={this.props.style}
				disabled={this.props.disabled}
				onClick={this.props.onClick}
				title={"Cancel"}
			/>
		);
	}
}

CancelButton.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	disabled:PropTypes.bool,
	onClick:PropTypes.func,
};

CancelButton.defaultProps = {
	className:"",
	style:{},
	disabled:false,
	onClick:null,
};

export default CancelButton;