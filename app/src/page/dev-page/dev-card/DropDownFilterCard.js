import React, { Component } from 'react';
import DropDownFilter from 'Component/common/dropdown/DropDownFilter';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class DropDownFilterCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			itemList:[
				{
					value:1,
					title:"Broccoli"
				},
				{
					value:2,
					title:"Apple"
				},
				{
					value:3,
					title:"Durian"
				}
			],
			name:"Test",
			value:null
		};
	}

	render() {

		return (
			<DevCardView
				name={"DropDownFilter"}
				desc={[
					"<code>Not available</code> Please refer to AdvancedButtonCard.js",
				]}
				component={
					<div>
						<div style={{marginBottom:"30px"}}>
							<DropDownFilter
								buttonType={'anchor'}
								text={this.state.name}
								itemList={this.state.itemList}
								onChange={(itemList) => {
									this.setState({
										value:itemList.value
									});
								}}
								value={this.state.value}
							/>
						</div>
						<div style={{marginBottom:"30px"}}>
							<DropDownFilter
								buttonType={'button'}
								text={this.state.name}
								itemList={this.state.itemList}
								onChange={(itemList) => {
									this.setState({
										value:itemList.value
									});
								}}
								value={this.state.value}
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

export default DropDownFilterCard;