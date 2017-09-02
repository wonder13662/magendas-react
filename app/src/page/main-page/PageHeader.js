import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSession } from 'Action/account';
import RoutePath from 'Src/RoutePath';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import 'style-loader!./main-page-theme.less';

class PageHeader extends Component {

	constructor(props) {
		super(props);
		this.onClickLogout = this.onClickLogout.bind(this);
	}

	onClickLogout(event) {
		event.preventDefault();
		this.props.updateSession(null);
	}

	render() {
		const { session } = this.props;
		return (
			<nav id="pageHeader" className="navbar navbar-static-top">
				<div className="container header-container">
					<div className="brand-container">
						<Link to={RoutePath.MAIN.HOME} className="navbar-brand app-logo">HOME</Link>
					</div>
					<div className="menu-container">
						<ul className="nav navbar-nav">
							{this.props.children}
						</ul>
					</div>
				</div>
			</nav>

		);
	}
}

PageHeader.propTypes = {
	session: PropTypes.object
};

const mapStateToProps = (storeState, ownProps) => {
	return {
		session: storeState.account.session
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateSession: (value) => {
			dispatch(updateSession(value));
		}
	};
};

// reason for using withRouter: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageHeader));