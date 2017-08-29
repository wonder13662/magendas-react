import React, { Component } from 'react';
import Button from 'Component/common/button/Button';
import DevCardView from 'DevPage/common/DevCardView';

class ButtonCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisable:false
        };

        this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton(event) {
        // Do something...
    }

    render() {
        return (
            <DevCardView
                name={"Button"}
                desc={[
                    "<code>className</code> set CSS Class which apply to button when it's enable",
                    "<code>classNameDim</code> set CSS Class which apply to button when it's dimed",
                    "<code>style</code> set CSS style",
                    "<code>disabled</code> set Button disabled. It become 'Dim' status",
                    "<code>onClick</code> set Button callback when it has been clicked.",
                    "<code>title</code> set Button text - Button name on view"
                ]}
                component={
                    <div>
                        <Button
                            className={"btn btn-primary"}
                            classNameDim={"btn btn-primary btn-primary-dim"}
                            style={{}}
                            disabled={false}
                            onClick={this.onClickButton}
                            title={"Enable"}
                        />
                        <Button
                            className={"btn btn-primary"}
                            classNameDim={"btn btn-primary btn-primary-dim"}
                            style={{marginLeft:"10px"}}
                            disabled={true}
                            onClick={this.onClickButton}
							title={"Dim"}
                        />

                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;btn btn-primary&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;classNameDim=&#123;btn btn-primary btn-primary-dim&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;display:'block'&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;false&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.onClickButton&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Enable&#34;&#125;</div>
                        <div className="nt">/&gt;</div>

                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;btn btn-primary&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;classNameDim=&#123;btn btn-primary btn-primary-dim&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;display:'block'&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;true&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.onClickButton&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Dim&#34;&#125;</div>
                        <div className="nt">/&gt;</div>
                    </div>
                }
            />
        );
    }
}

export default ButtonCard;