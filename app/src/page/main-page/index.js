import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom';
import { updateSession } from 'Action/account';
import RoutePath from 'Src/RoutePath';
import PageHeader from 'MainPage/PageHeader';
import HomeContent from 'MainPage/home/HomeContent';
import PeopleContentIndex from 'MainPage/people';
import ProfileContent from 'MainPage/profile/ProfileContent';
import ContentNotFoundScreen from 'Component/screen/ContentNotFound';

import 'style-loader!./main-page-theme.less';

export default class MainPageIndex extends Component {

	constructor(props, context) {
		super(props, context);
		this.store = this.context.store;
		this.store.dispatch(updateSession(this.props.session));
	}

	componentDidMount() {
		this.unsubscribe = this.store.subscribe(() => {
			if (!this.store.getState().account.session) {
				// TODO : Redirect to login dialogue when user logged out.
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return (
			<BrowserRouter>
				<div id="mainPageContainer">
					<PageHeader>
						<li><NavLink to={RoutePath.MAIN.HOME} activeClassName="active">Home</NavLink></li>
						<li><NavLink to={RoutePath.MAIN.PEOPLE_ENTRY} activeClassName="active">People</NavLink></li>
					</PageHeader>
					<Switch>
						<Route exact path={RoutePath.MAIN_ENTRY} render={() => <Redirect to={RoutePath.MAIN.HOME} />} />
						<Route path={RoutePath.MAIN.HOME} component={HomeContent} />
						<Route path={RoutePath.MAIN.PEOPLE_ENTRY} component={PeopleContentIndex} />
						<Route path={`${RoutePath.MAIN.PROFILE_ENTRY}/:userId`} component={ProfileContent} />
						<Route component={ContentNotFoundScreen}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

MainPageIndex.contextTypes = {
	store: PropTypes.object
};

MainPageIndex.propTypes = {
	session: PropTypes.object
};