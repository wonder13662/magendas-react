import React, { Component } from 'react';
import TextUtil from 'Util/TextUtil';
import DevCardView from 'DevPage/common/DevCardView';
import FormInput from 'Component/common/input/FormInput';
import parsleyjs from "parsleyjs";
import Button from 'Component/common/button/Button';

/*
    @ Referer : http://parsleyjs.org/doc/index.html#Built-in validators
 */

class FormParselyCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisable:false,
			text1: "Tho sssKithoong",
			text2: "Please make it short and clear",
			text3: "It's disabled",
        };

        this.onChange = this.onChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
    }

    componentDidMount() {
        if(!this.formElement) {
            return;
        }

        window.Parsley.addValidator('mycustom', {
            validateString: (value) => {
                return (-1 < value.toLowerCase().indexOf("a"));
            },
            messages: {
                en: 'This string has no letter - a',
                fr: "Cette valeur n'est pas l'inverse d'elle même."
            }
        });
    }

    onChange(param) {
        // Do something...
    }

    onFilter(param) {
        if(param && !TextUtil.isEmpty(param.userInput)) {
            // 여기서 사용자가 입력한 내용을 필터링합니다.
            return param.userInput;
        }

        // 유효하지 않은 입력 혹은 입력한 문자가 모두 지워졌습니다. 공백을 돌려줍니다.
        return "";
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
                name={"FormInputParsely | FormParselyCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to SearchBarCard.js",
                ]}
                component={
                    <div>
                        <form ref={el => this.formElement=el} data-parsley-validate="">
                            <FormInput
                                labelTitle={"Employee Name"}
								text={this.state.text1}
                                placeholder={"Type Anything"}
								onChange={option => this.setState({text1: option.userInput})}
                                onFilter={this.onFilter}
                                attr={{
                                    "data-parsley-maxlength":4,
                                    "data-parsley-required":true,
                                }}
                            />
                            <FormInput
								labelTitle={"Employee Email"}
								text={this.state.text2}
                                placeholder={"what.is.your.email@myapp.com"}
								onChange={option => this.setState({text2: option.userInput})}
                                onFilter={this.onFilter}
                                attr={{
                                    "data-parsley-type":"email",
                                    "data-parsley-required":true,
                                }}
                            />
                            <FormInput
								labelTitle={"Employee Phone"}
								text={this.state.text3}
                                placeholder={"010-1234-4321"}
								onChange={option => this.setState({text3: option.userInput})}
                                onFilter={this.onFilter}
								disabled
                                attr={{
                                    "data-parsley-required":true,
                                    "data-parsley-mycustom":""
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

export default FormParselyCard;