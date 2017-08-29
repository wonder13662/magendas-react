import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import FormSelect from 'Component/common/input/FormSelect';
import Button from 'Component/common/button/Button';

class FormSelectCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			options:[
				{value: 1, title: "Apple"},
				{value: 2, title: "Orange"},
				{value: 3, title: "WaterMelon"},
				{value: 4, title: "Cherry"},
				{value: 5, title: "Banana"},
				{value: 6, title: "Pear"},
			],
			select1Value: "",
		};

		this.onClickButton = this.onClickButton.bind(this);
	}

	componentDidMount() {
		if(!this.formElement) {
			return;
		}

		window.Parsley.addValidator('mycustomselectparsley', {
			validateString: (value) => {
				return (2 < value)?true:false;
			},
			messages: {
				en: 'Index should be bigger than 2',
				fr: "Cette valeur n'est pas l'inverse d'elle même."
			}
		});
	}

	onClickButton() {
		if(!this.formElement) {
			return;
		}

		const myParsley = $(this.formElement).parsley();
		myParsley.on('field:validated', () => {
			// Do something...
		});
		myParsley.validate();
	}

	render() {
		return (
			<DevCardView
				name={"FormSelect | FormSelectCard.js"}
				desc={[
					"<code>Not available</code> Please refer to FormSelectCard.js",
				]}
				component={
					<div>
						<form ref={el => this.formElement=el}>
							<FormSelect
								labelTitle={"My favorite fruit"}
								options={this.state.options}
								onChange={option => this.setState({select1Value: option.value})}
								value={this.state.select1Value}
								onBlur={this.onBlur}
								style={{display:"inline-block"}}
								attr={{
									"data-parsley-required":true,
									"data-parsley-mycustomselectparsley":""
								}}
							/>
						</form>
						<div>
							<Button
								className={"btn btn-default"}
								classNameDim={"btn btn-default btn-primary-dim"}
								style={{display:'block'}}
								disabled={false}
								onClick={this.onClickButton}
								title={"Submit"}
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

export default FormSelectCard;