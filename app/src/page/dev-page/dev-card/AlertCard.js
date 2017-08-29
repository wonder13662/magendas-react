import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Alert from 'Component/common/alert/Alert';

class AlertCard extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<DevCardView
				name={"Alert | AlertCard.js"}
				desc={[
					"<code>Not available</code> Please refer to AlertCard.js",
				]}
				component={
					<div>
						<Alert
							success
							msg={"You've done well!"}
						/>
						<Alert
							success
						>
							<div>SUCCESS CHILD</div>
						</Alert>
						<Alert
							info
							msg={"Here's the thing you should know"}
						/>
						<Alert
							info
						>
							<div>INFO CHILD</div>
						</Alert>
						<Alert
							warning
							msg={"Watch out!"}
						/>
						<Alert
							warning
						>
							<div>WARNING CHILD</div>
						</Alert>
						<Alert
							danger
							msg={"Get away from here!"}
						/>
						<Alert
							danger
						>
							<div>DANGER CHILD</div>
						</Alert>
					</div>
				}
				code={
					<div>
						<div className="nt">Not supported</div>
					</div>
				}
			/>
		);
	}
}

export default AlertCard;