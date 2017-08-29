import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Select from 'Component/common/input/Select';

class SelectCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			options:[
				{value: 1, title: "Apple"},
				{value: 2, title: "Orange"},
				{value: 'a', title: "WaterMelon"},
				{value: 4, title: "Cherry"},
				{value: 5, title: "Banana"},
				{value: 6, title: "Pear"},
			],
			select1Value: "",
			select2Value: "3",
			select3Value: "5",
		};

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(param) {

	}

	onBlur(param) {

	}

	render() {
		return (
			<DevCardView
				name={"Select | SelectCard.js"}
				desc={[
					"<code>Not available</code> Please refer to SelectCard.js",
				]}
				component={
					<div>
						<Select
							options={this.state.options}
							onChange={option => this.setState({select1Value: option.value})}
							value={this.state.select1Value}
							onBlur={this.onBlur}
							style={{width:"150px",display:"inline-block"}}
						/>
						<Select
							options={this.state.options}
							onChange={option => this.setState({select2Value: option.value})}
							value={this.state.select2Value}
							onBlur={this.onBlur}
							style={{width:"150px",display:"inline-block",marginLeft:"10px"}}
						/>
						<Select
							options={this.state.options}
							onChange={option => this.setState({select3Value: option.value})}
							value={this.state.select3Value}
							onBlur={this.onBlur}
							style={{width:"150px",display:"inline-block",marginLeft:"10px"}}
						/>
						<Select
							options={this.state.options}
							onChange={this.onChange}
							onBlur={this.onBlur}
							style={{width:"150px",display:"inline-block",marginLeft:"10px"}}
							value={this.state.options[(this.state.options.length - 1)].value}
							disabled
						/>
						<Select
							options={this.state.options}
							onChange={this.onChange}
							onBlur={this.onBlur}
							style={{width:"150px",display:"inline-block",marginLeft:"10px"}}
							value={this.state.options[(this.state.options.length - 1)].value}
							readOnly
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

export default SelectCard;