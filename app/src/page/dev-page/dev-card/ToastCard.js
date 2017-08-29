import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Button from 'Component/common/button/Button';
import Toast from 'Helper/Toast';
// import {toastr} from 'react-redux-toastr';
// import 'style-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css';

/*
	@ Reference : https://www.npmjs.com/package/react-redux-toastr
	@ GitHub : https://github.com/diegoddox/react-redux-toastr
	@ Demo : http://diegoddox.github.io/react-redux-toastr/
 */

class ToastCard extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};

		this.onClickShowSuccess = this.onClickShowSuccess.bind(this);
		this.onClickShowWarning = this.onClickShowWarning.bind(this);
		this.onClickShowError = this.onClickShowError.bind(this);
		this.onClickShowInfo = this.onClickShowInfo.bind(this);

	}

	onClickShowSuccess() {
		Toast.success("It's success.","I'm feeling great!");
	}

	onClickShowWarning() {
		Toast.warning("It's warning.","Be aware!");
	}

	onClickShowError() {
		Toast.error("It's error.","Oops, something went wrong.");
	}

	onClickShowInfo() {
		Toast.info("It's info.","I'm happy with this!");
	}

	render() {
		return (
			<DevCardView
				name={"Toast | ToastCard.js"}
				desc={[
					"<code>Not available</code> Please refer to ToastCard.js",
				]}
				component={
					<div>
						<Button
							className={"btn btn-success"}
							style={{marginLeft:"10px"}}
							onClick={this.onClickShowSuccess}
							title={"Success Fade"}
						/>
						<Button
							className={"btn btn-warning"}
							style={{marginLeft:"10px"}}
							onClick={this.onClickShowWarning}
							title={"Warning Fade"}
						/>
						<Button
							className={"btn btn-danger"}
							style={{marginLeft:"10px"}}
							onClick={this.onClickShowError}
							title={"Fail Fade"}
						/>
						<Button
							className={"btn btn-info"}
							style={{marginLeft:"10px"}}
							onClick={this.onClickShowInfo}
							title={"Info Fade"}
						/>

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

export default ToastCard;