import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Component/common/button/Button';
import 'style-loader!Component/common/button/button.less';
import 'style-loader!font-awesome/less/font-awesome.less';

class EditButton extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const className = `btn btn-warning ${this.props.className}`;
		return (
			<Button
				className={className}
				style={this.props.style}
				disabled={this.props.disabled}
				onClick={this.props.onClick}
				title={" Edit"}
			>
				<i className="fa fa-pencil"/>
			</Button>
		);
	}
}

EditButton.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	disabled:PropTypes.bool,
	onClick:PropTypes.func,
};

EditButton.defaultProps = {
	className:"",
	style:{},
	disabled:false,
	onClick:null,
};

export default EditButton;