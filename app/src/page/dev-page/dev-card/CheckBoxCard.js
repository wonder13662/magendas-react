import React, { Component } from 'react';
import CheckBox from 'Component/common/checkbox/CheckBox';
import DevCardView from 'DevPage/common/DevCardView';

class CheckBoxCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            metaData:{
                id:1,
                name:"Sunshine",
            }
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange({ isChecked, metaData }) {
        // console.log("onChange / isChecked : ",isChecked);
        // console.log("onChange / metaData : ",metaData);
    }

    render() {
        return (
            <DevCardView
                name={"CheckBox | CheckBoxCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to CheckBoxCard.js",
                ]}
                component={
                    <div>
                        <CheckBox
                            title={"Employee Name"}
                            metaData={this.state.metaData}
                            onChange={this.onChange}
							style={{display:"inline-block"}}
                        />
						<CheckBox
							title={"Employee Name"}
							metaData={this.state.metaData}
							onChange={this.onChange}
							style={{display:"inline-block"}}
							checked
						/>
						<CheckBox
							title={"Employee Name"}
							metaData={this.state.metaData}
							onChange={this.onChange}
							style={{display:"inline-block"}}
							disabled
						/>
						<CheckBox
							title={"Employee Name"}
							metaData={this.state.metaData}
							onChange={this.onChange}
							style={{display:"inline-block"}}
							checked
							disabled
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

export default CheckBoxCard;