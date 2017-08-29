import React from 'react';
import 'style-loader!./content-not-found.less';

export default class ContentNotFound extends React.Component {

	constructor(props) {
		super(props);
		this.onClickPrevLink = this.onClickPrevLink.bind(this);
	}

	onClickPrevLink(ev) {
		ev.preventDefault();
		window.history.back();
	}

	render() {
		return (
			<div className="content-not-found-screen-container">
				<div className="container">
					<div className="row">
						<div className="error-template">
							<h1>Oops!</h1>
							<h2>Content Not Found</h2>
							<div className="error-details">
								Requested content not found.<br/>Please check the URL and try again.<br/>
							</div>
							<div className="error-actions">
								<a className="btn btn-link" onClick={this.onClickPrevLink}>
									<i className="fa fa-hand-o-left"/>go to prev content
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
