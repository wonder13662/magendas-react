import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import SingleDatePicker from 'Component/common/datepicker/SingleDatePicker';

class SingleDatePickerCard extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};

		this.onChange = this.onChange.bind(this);
	}

	onChange({ moment }) {
		const momentDateFormat = moment.format('YYYY MM DD');
		// console.log("momentDateFormat : ",momentDateFormat);
	}

	render() {
		return (
			<DevCardView
				name={"SingleDatePicker | SingleDatePickerCard.js"}
				desc={[
					"<code>Not available</code> Please refer to SingleDatePickerCard.js",
				]}
				component={
					<div>
						<SingleDatePicker
							value={1497502800000}
							onChange={this.onChange}
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

export default SingleDatePickerCard;