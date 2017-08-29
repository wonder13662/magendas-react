import React, { Component } from 'react';
import DropDownMultiSelect from 'Component/common/dropdown/DropDownMultiSelect';
import DevCardView from 'DevPage/common/DevCardView';
import ArrayUtil from 'Util/ArrayUtil';
import NumberUtil from 'Util/NumberUtil';
import 'style-loader!font-awesome/less/font-awesome.less';

class DropDownMultiSelectCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
			optGroups:[
				{
					title:"Fruits",
					options:[
						{
							value:"1",
							title:"Broccoli",
							checked:true,

						},
						{
							value:"2",
							title:"Apple",
							checked:false,
						},
						{
							value:"3",
							title:"Durian",
							checked:true,
						}
					]
				},
				{
					title:"Flowers",
					options:[
						{
							value:"11",
							title:"Rose",
							checked:false,
						},
						{
							value:"12",
							title:"Azalea",
							checked:false,
						},
						{
							value:"13",
							title:"Begonia",
							checked:false,
						}
					]
				}
			],
			buttonTitleGroup:"Choose From Group",
			options1:[
				{
					value:"1",
					title:"Broccoli_Broccoli_Broccoli_Broccoli_Broccoli",
					checked:false,
				},
				{
					value:"2",
					title:"Apple",
					checked:false,
				},
				{
					value:"3",
					title:"Durian",
					checked:false,
				}
			],
			buttonTitleOptions1:"Choose From Options",
            options2:[
                {
                    value:"1",
                    title:"Broccoli",
					checked:false,
                },
                {
                    value:"2",
                    title:"Apple",
					checked:false,
                },
                {
                    value:"3",
                    title:"Durian",
					checked:false,
                }
            ],
			buttonTitleOptions2:"Choose From Options",
        };

        this.onChangeOptions1 = this.onChangeOptions1.bind(this);
		this.onChangeOptions2 = this.onChangeOptions2.bind(this);
		this.onChangeOptGroups = this.onChangeOptGroups.bind(this);
    }

	onChangeOptGroups({ optGroups, options }) {

		let count = 0;

    	if(ArrayUtil.isValid(optGroups)) {
    		for(let optGroup of optGroups) {
    			const optionList = optGroup.options;
				for(let option of optionList) {
					if(option.checked) {
						count++;
					}
				}
			}
		} else if(ArrayUtil.isValid(options)) {
			for(let option of options) {
				if(option.checked) {
					count++;
				}
			}
		}

		// if(0 < count) {
		// 	this.setState({buttonTitleGroup:`${count} items selected!`});
		// } else {
		// 	this.setState({buttonTitleGroup:`Choose From Group`});
		// }

	}

	onChangeOptions1({ optGroups, options }) {

		 let count = 0;

		 if(ArrayUtil.isValid(optGroups)) {
			 for(let optGroup of optGroups) {
				 const optionList = optGroup.options;
				 for(let option of optionList) {
					 if(option.checked) {
						 count++;
					 }
				 }
			 }
		 } else if(ArrayUtil.isValid(options)) {
			 for(let option of options) {
				 if(option.checked) {
					 count++;
				 }
			 }
		 }

		 // if(0 < count) {
			//  this.setState({buttonTitleOptions1:`${count} items selected!`});
		 // } else {
			//  this.setState({buttonTitleOptions1:`Choose From Options`});
		 // }
	}

	onChangeOptions2({ optGroups, options }) {

		let count = 0;

		if(ArrayUtil.isValid(optGroups)) {
			for(let optGroup of optGroups) {
				const optionList = optGroup.options;
				for(let option of optionList) {
					if(option.checked) {
						count++;
					}
				}
			}

		} else if(ArrayUtil.isValid(options)) {
			for(let option of options) {
				if(option.checked) {
					count++;
				}
			}
		}

		// if(0 < count) {
		// 	this.setState({buttonTitleOptions2:`${count} items selected!`});
		// } else {
		// 	this.setState({buttonTitleOptions2:`Choose From Options`});
		// }
	}

    render() {

        return (
            <DevCardView
                name={"DropDownMultiSelect | DropDownMultiSelectCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to SearchBarCard.js",
                ]}
                component={
                    <div>
						<div style={{display:"inline-block"}}>
							<DropDownMultiSelect
								buttonType={'anchor'}
								buttonPlaceholder={this.state.buttonTitleOptions1}
								buttonWidth={200}
								options={this.state.options1}
								onChange={this.onChangeOptions1}
							/>
						</div>
						<br/><br/>
						<div style={{display:"inline-block"}}>
							<DropDownMultiSelect
								buttonType={'button'}
								buttonPlaceholder={this.state.buttonTitleOptions2}
								buttonWidth={200}
								options={this.state.options2}
								onChange={this.onChangeOptions2}
								disabled
							/>
						</div>
						<div style={{display:"inline-block",marginLeft:"10px"}}>
							<DropDownMultiSelect
								buttonType={'button'}
								buttonPlaceholder={this.state.buttonTitleOptions2}
								buttonWidth={200}
								options={this.state.options2}
								onChange={this.onChangeOptions2}
							/>
						</div>
						<br/><br/>
						<div style={{display:"inline-block"}}>
							<DropDownMultiSelect
								buttonType={'button'}
								buttonPlaceholder={this.state.buttonTitleGroup}
								buttonWidth={200}
								optGroups={this.state.optGroups}
								onChange={this.onChangeOptGroups}
								disabled
							/>
						</div>
						<div style={{display:"inline-block",marginLeft:"10px"}}>
							<DropDownMultiSelect
								buttonType={'button'}
								buttonPlaceholder={this.state.buttonTitleGroup}
								buttonWidth={200}
								optGroups={this.state.optGroups}
								onChange={this.onChangeOptGroups}
								onChangeMsg={({ checkedOptCount }) => {

									let msg = "";
									if(NumberUtil.isUnsigned(checkedOptCount)) {
										if(0 === checkedOptCount) {
											msg = "Choose fruit";
										} else if(1 === checkedOptCount) {
											msg = "One fruit selected.";
										} else if(1 < checkedOptCount) {
											msg = `${checkedOptCount} fruits selected.`;
										}
									}

									return msg;
								}}
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

export default DropDownMultiSelectCard;