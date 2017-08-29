import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import CancelButton from 'Component/common/button/CancelButton';
import EditButton from 'Component/common/button/EditButton';
import RemoveButton from 'Component/common/button/RemoveButton';
import SaveButton from 'Component/common/button/SaveButton';

class AdvancedButtonCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading:false,
		};

		this.onClickCancelButton = this.onClickCancelButton.bind(this);
		this.onClickEditButton = this.onClickEditButton.bind(this);
		this.onClickRemoveButton = this.onClickRemoveButton.bind(this);
		this.onClickSaveButton = this.onClickSaveButton.bind(this);
	}

	onClickCancelButton() {

	}

	onClickEditButton() {

	}

	onClickRemoveButton() {

	}

	onClickSaveButton() {
		// 로딩 시작!
		this.setState({
			isLoading:true
		});
		setTimeout(() => {
			// 로딩 완료!
			this.setState({
				isLoading:false
			});
		}, 3000);
	}

	render() {
		return (
			<DevCardView
				name={"Buttons | AdvancedButtonCard.js"}
				desc={[
					"<code>Not available</code> Please refer to AdvancedButtonCard.js",
				]}
				component={
					<div>
						<div>
							<CancelButton
								disabled={false}
								onClick={this.onClickCancelButton}
							/>
							<CancelButton
								disabled={true}
								onClick={this.onClickCancelButton}
								style={{marginLeft:"10px"}}
							/>
							<EditButton
								disabled={false}
								onClick={this.onClickEditButton}
								style={{marginLeft:"10px"}}
							/>
							<EditButton
								disabled={true}
								onClick={this.onClickEditButton}
								style={{marginLeft:"10px"}}
							/>
							<RemoveButton
								disabled={false}
								onClick={this.onClickRemoveButton}
								style={{marginLeft:"10px"}}
							/>
							<RemoveButton
								disabled={true}
								onClick={this.onClickRemoveButton}
								style={{marginLeft:"10px"}}
							/>
							<SaveButton
								disabled={false}
								onClick={this.onClickSaveButton}
								style={{marginLeft:"10px"}}
								isLoading={this.state.isLoading}
							/>
						</div>
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

export default AdvancedButtonCard;