import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';

export default class LoadingScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$(this.loadingScreenEl).fadeIn();
	}

	componentDidUpdate() {
		if(this.props.hide) {
			$(this.loadingScreenEl).fadeOut();
		}else {
			$(this.loadingScreenEl).fadeIn();
		}
	}

	render() {
		return (
			<div className="loading-screen" ref={el => this.loadingScreenEl = el}>Loading Screen</div>
		);
	}
}

LoadingScreen.defaultProps = {
	hide: false
};

LoadingScreen.propTypes = {
	hide: PropTypes.bool.isRequired
};