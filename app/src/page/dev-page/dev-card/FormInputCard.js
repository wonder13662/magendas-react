import React, { Component } from 'react';
import FormInput from 'Component/common/input/FormInput';
import TextUtil from 'Util/TextUtil';
import DevCardView from 'DevPage/common/DevCardView';

class FormInputCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisable:false
        };

        this.onChange = this.onChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
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


    render() {
        return (
            <DevCardView
                name={"FormInput | FormInputCard.js"}
                desc={[
                    "<code>id</code> set HTML input node's id. For jquery select query or others.",
                    "<code>className</code> set CSS Class which apply to input node.",
                    "<code>labelTitle</code> set text of label which is left side of input node.",
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
                        <FormInput
                            id={"form-input-card-component"}
							labelTitle={"Employee Name"}
                            text={"Tho Kithoong"}
                            placeholder={"Type Anything"}
                            disabled={false}
                            readOnly={false}
                            style={{}}
                            isReset={false}
                            onChange={this.onChange}
                            onFilter={this.onFilter}
                        />
                        <FormInput
                            id={"form-input-card-component"}
							labelTitle={"Long Label Text is here"}
                            text={"Please make it short and clear"}
                            placeholder={"Type Anything"}
                            disabled={false}
                            readOnly={false}
                            style={{}}
                            isReset={false}
                            onChange={this.onChange}
                            onFilter={this.onFilter}
                        />
                        <FormInput
                            id={"form-input-card-component"}
							labelTitle={"Label disabled"}
                            text={"It's disabled"}
                            placeholder={"Type Anything"}
                            disabled={true}
                            readOnly={false}
                            style={{}}
                            isReset={false}
                            onChange={this.onChange}
                            onFilter={this.onFilter}
                        />
                        <FormInput
                            id={"form-input-card-component"}
							labelTitle={"Label readonly"}
                            text={"It's readonly"}
                            placeholder={"Type Anything"}
                            disabled={false}
                            readOnly={true}
                            style={{}}
                            isReset={false}
                            onChange={this.onChange}
                            onFilter={this.onFilter}
                        />
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;FormInput</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;id=&#123;&#34;input-card-component-price&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;&#34;input form-control&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;labelTitle=&#123;&#34;Employee Name&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;text=&#123;&#34;Tho Kithoong&#34;&#125;</div>
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

export default FormInputCard;