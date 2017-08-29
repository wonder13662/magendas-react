import React from 'react';
import 'style-loader!./loading-spinner.less';

export default class LoadingSpinner extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="swv-loading-spinner-container">
				<div className="loading-spinner"/>
			</div>
		);
	}
}

