import React, { Component } from 'react';
import Input from 'Component/common/input/Input';
import CurrencyInput from 'Component/common/input/CurrencyInput';
import TextUtil from 'Util/TextUtil';
import DevCardView from 'DevPage/common/DevCardView';

class InputCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisable:false,
			inputText1: '',
			inputText2: "It's disabled",
			inputText3: "It's readonly",
			inputText4: '',
			inputText5: '',
			sample:2000,
			sample100:2000,
        };
		this.onChangeText1 = this.onChangeText1.bind(this);
		this.onChangeText2 = this.onChangeText2.bind(this);
		this.onChangeText3 = this.onChangeText3.bind(this);
		this.onChangeText4 = this.onChangeText4.bind(this);
		this.onChangeText5 = this.onChangeText5.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onFilterEng = this.onFilterEng.bind(this);
        this.onFilterPrice = this.onFilterPrice.bind(this);

		this.onBlurSample = this.onBlurSample.bind(this);
    }

	onBlurSample({ userInput }) {
		this.setState({ sample:userInput });
	}

    onChange(param) {
        // Do something...
    }
	onChangeText1({ userInput }) {
    	this.setState({inputText1: userInput});
	}
	onChangeText2({ userInput }) {
		this.setState({inputText2: userInput});
	}
	onChangeText3({ userInput }) {
		this.setState({inputText3: userInput});
	}
	onChangeText4({ userInput }) {
		this.setState({inputText4: userInput});
	}
	onChangeText5({ userInput }) {
		this.setState({inputText5: userInput});
	}
    onFilter({ userInput }) {

        if(!TextUtil.isEmpty(userInput)) {
            // 여기서 사용자가 입력한 내용을 필터링합니다.
            return userInput;
        }

        // 유효하지 않은 입력 혹은 입력한 문자가 모두 지워졌습니다. 공백을 돌려줍니다.
        return "";
    }

    onFilterEng({ userInput }) {
        if(!TextUtil.isEmpty(userInput)) {
            // 여기서 사용자가 입력한 내용을 필터링합니다.
            const userInputFiltered = userInput.replace(/[^a-zA-Z ]+/gi,"");
            return userInputFiltered;
        }

        // 유효하지 않은 입력 혹은 입력한 문자가 모두 지워졌습니다. 공백을 돌려줍니다.
        return "";
    }

    onFilterPrice({ userInput }) {
        if(!TextUtil.isEmpty(userInput)) {
            // 여기서 사용자가 입력한 내용을 필터링합니다.
            const userInputFiltered = userInput.replace(/[^0-9]+/gi,"");
            // 올바른 가격 표시인지 확인
            let userInputFilteredNumber = parseInt(userInputFiltered);
            // 3자리마다 끊는 Price format 적용 ex)100,000
            const userInputNumberFormat = TextUtil.getNumberWithComma(userInputFilteredNumber);

            return userInputNumberFormat;
        }

        // 유효하지 않은 입력 혹은 입력한 문자가 모두 지워졌습니다. 공백을 돌려줍니다.
        return "";
    }

    render() {
        return (
            <DevCardView
                name={"Input | InputCard.js"}
                desc={[
                    "<code>id</code> set HTML input node's id. For jquery select query or others.",
                    "<code>className</code> set CSS Class which apply to input node.",
                    "<code>text</code> set text of user input showing on input node.",
                    "<code>placeholder</code> sets Input placeholder.",
                    "<code>disabled</code> set Input disabled. It become 'Dim' status.",
                    "<code>readOnly</code> set Input disabled. Cannot edit text in input node.",
                    "<code>style</code> set CSS style on input node.",
                    "<code>isReset</code> flag value to reset input node with empty string.",
                    "<code>onChange</code> set onChange function when it fires input node changed.",
                    "<code>onFilter</code> set onChange function when it fires input node changed. Input Component will apply its returning value.",
                ]}
                component={
                    <div>
                        <Input
                            id={"input-card-component"}
                            text={this.state.inputText1}
                            placeholder={"Type Anything"}
                            disabled={false}
                            readOnly={false}
                            style={{}}
                            onChange={this.onChangeText1}
                            onFilter={this.onFilter}
							right
							inputRef={el => console.log(el)}
                        />
                        <Input
                            id={"input-card-component2"}
                            text={this.state.inputText2}
                            placeholder={"Type Anything"}
                            disabled={true}
                            readOnly={false}
                            style={{marginTop:"15px"}}
                            onChange={this.onChangeText2}
                            onFilter={this.onFilter}
                        />
                        <Input
                            id={"input-card-component3"}
							text={this.state.inputText3}
                            placeholder={"Type Anything"}
                            disabled={false}
                            readOnly={true}
                            style={{marginTop:"15px"}}
                            onChange={this.onChangeText3}
                            onFilter={this.onFilter}
                        />
                        <Input
                            id={"input-card-component-eng"}
                            text={this.state.inputText4}
                            placeholder={"Type English only"}
                            disabled={false}
                            readOnly={false}
                            style={{marginTop:"15px"}}
                            onChange={this.onChangeText4}
                            onFilter={this.onFilterEng}
                        />
                        <Input
                            id={"input-card-component-price"}
                            text={this.state.inputText5}
                            placeholder={"Type Price only"}
                            disabled={false}
                            readOnly={false}
                            style={{marginTop:"15px"}}
                            onChange={this.onChangeText5}
                            onFilter={this.onFilterPrice}
                        />
						<CurrencyInput
							amount={this.state.sample}
							placeholder={"Type Anything"}
							onBlur={this.onBlurSample}
							currency={"RM"}
							style={{marginTop:"15px"}}
							max={50000}
						/>
						<CurrencyInput
							onChange={({ userInput }) => {
								this.setState({ sample100:userInput });
							}}
							onBlur={({ userInput }) => {
								this.setState({ sample100:userInput });
							}}
							amount={`${this.state.sample100}`}
							currency={"RM"}
						/>
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;Input</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;id=&#123;&#34;input-card-component-price&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;&#34;input form-control&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;text=&#123;&#34;&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;placeholder=&#123;&#34;Type Price only&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;false&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;readOnly=&#123;false&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;marginTop:&#34;15px&#34;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;isReset=&#123;false&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onChange=&#123;this.onChange&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onFilter=&#123;this.onFilterPrice&#125;</div>
                        <div className="nt">/&gt;</div>
                    </div>
                }
            />
        );
    }
}

export default InputCard;