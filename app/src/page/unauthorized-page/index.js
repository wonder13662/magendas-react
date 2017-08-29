import React from 'react';

import 'style-loader!./unauthorized-page-theme.less';

export default class UnauthorizedPage extends React.Component {
	constructor(props) {
		super(props);
		this.onClickGoHomeBtn = this.onClickGoHomeBtn.bind(this);
	}

	onClickGoHomeBtn(ev) {
		ev.preventDefault();
		// TODO : do something...
	}

	render() {

		return (
			<div id="unauthorizedPageContainer">
				<div className="container">
					<h1 className="title">(._.)?</h1>
					<h3 className="sub-title">You are not authorized to view this page</h3>
					<p className="description">Please check your permission to access this page.</p>
					<button
						className="btn btn-default"
						onClick={this.onClickGoHomeBtn}>
						Go to App Home
					</button>
				</div>
			</div>
		);
	}
}