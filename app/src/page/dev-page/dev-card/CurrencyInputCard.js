import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import CurrencyInput from 'Component/common/input/CurrencyInput';

class CurrencyInputCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			amount:"0.00",
			amountDual:"0.00",
		};

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChangeDual = this.onChangeDual.bind(this);
		this.onBlurDual = this.onBlurDual.bind(this);

	}

	onChange({ userInput }) {
		this.setState({ amount:userInput });
	}

	onBlur({ userInput }) {
		this.setState({ amount:userInput });
	}

	onChangeDual({ userInput }) {
		this.setState({ amountDual:userInput });
	}

	onBlurDual({ userInput }) {
		this.setState({ amountDual:userInput });
	}


	render() {
		return (
			<DevCardView
				name={"CurrencyInput | CurrencyInputCard.js"}
				desc={[
					"<code>Not available</code> Please refer to CurrencyInputCard.js",
				]}
				component={
					<div>
						<CurrencyInput
							onChange={this.onChange}
							onBlur={this.onBlur}
							amount={this.state.amount}
							currency={"$"}
							style={{ display:"inline-block",marginRight:"10px" }}
						/>
						<CurrencyInput
							onChange={this.onChange}
							onBlur={this.onBlur}
							amount={"0.00"}
							currency={"KRW"}
							style={{ display:"inline-block",marginRight:"10px" }}
							disabled
						/>
						<CurrencyInput
							onChange={this.onChangeDual}
							onBlur={this.onBlurDual}
							amount={this.state.amountDual}
							style={{ display:"inline-block",marginRight:"10px" }}
							title={"SOCSO"}
							currency={"RM"}
							dual
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

export default CurrencyInputCard;