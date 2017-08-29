import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RoutePath from 'Src/RoutePath';
import PeopleContent from 'MainPage/people/PeopleContent';
import ProfileContent from 'MainPage/profile/ProfileContent';

import ContentNotFoundScreen from 'Component/screen/ContentNotFound';

class PeopleContentIndex extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// Redirect to people/list
		if (this.props.location.pathname === RoutePath.MAIN.PEOPLE_ENTRY) {
			return(<Redirect to={RoutePath.MAIN.PEOPLE.LIST} />);
		}
		return (
			<div>
				<Switch>
					<Route exact path={RoutePath.MAIN.PEOPLE.LIST} component={PeopleContent} />
					<Route path={`${RoutePath.MAIN.PEOPLE.PROFILE}/:userId`} component={ProfileContent} />

					<Route component={ContentNotFoundScreen}/>
				</Switch>
			</div>
		);
	}
}

export default PeopleContentIndex;