import React from 'react';
import RoutePath from 'Src/RoutePath';

import 'style-loader!./not-found-page-theme.less';

export default class NotFoundPage extends React.Component {

	constructor(props) {
		super(props);
		this.onClickHomeBtn = this.onClickHomeBtn.bind(this);
	}

	onClickHomeBtn(ev) {
		ev.preventDefault();
		location.href = RoutePath.MAIN.HOME;
	}

	render() {

		return (
			<div id="notFoundPageContainer">
				<div className="container">
					<div className="row">
						<div className="error-template">
							<h1>Oops!</h1>
							<h2>404 Not Found</h2>
							<div className="error-details">
								Sorry, an error has occured, Requested page not found!<br/>
							</div>
							<div className="error-actions">
								<a className="btn btn-primary"
								   onClick={this.onClickHomeBtn}>
									<i className="fa fa-home"/> Go to Home
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}