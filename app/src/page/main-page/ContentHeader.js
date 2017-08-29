import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentHeader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="contentHeader">
				<div className="container">
					<h2>{this.props.title}</h2>
				</div>
			</div>
		);
	}
}

ContentHeader.propTypes = {
	title: PropTypes.string.isRequired
};

export default ContentHeader;