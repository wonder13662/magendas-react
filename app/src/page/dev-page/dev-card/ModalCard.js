import React, { Component } from 'react';
import Button from 'Component/common/button/Button';
import Modal from 'Component/common/modal/Modal';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class ModalCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisableBtn:false,
            isDisableBtnSmallModal:false,

			showSmallModal: false,
			showModal: false,
			showLargeModal: false,
			isLoadingSmallModal: false,
			isLoadingModal: false,
			isLoadingLargeModal: false
        };

        this.onClickButton = this.onClickButton.bind(this);
        this.onCompleted = this.onCompleted.bind(this);

        this.onClickButtonSmall = this.onClickButtonSmall.bind(this);
        this.onCompletedSmall = this.onCompletedSmall.bind(this);

        this.onClickButtonLarge = this.onClickButtonLarge.bind(this);
        this.onCompletedLarge = this.onCompletedLarge.bind(this);

        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    onClickButton(event) {
        this.setState({
            showModal:true,
            showModalSmallModal:false,
            showModalLargeModal:false,
        });
    }

    onCompleted(param) {

    }

    onClickButtonSmall (event) {
        this.setState({
            showModal:false,
            showModalSmallModal:true,
            showModalLargeModal:false,
        });
    }

    onCompletedSmall (param) {

    }

    onClickButtonLarge (event) {
        this.setState({
            showModal:false,
            showModalSmallModal:false,
            showModalLargeModal:true,
        });
    }

    onCompletedLarge (param) {

    }

    onClickSubmit(size) {
    	if(size === 'small') {
			this.setState({isLoadingSmallModal : true});
			setTimeout(() => {
				// 로딩 완료!
				this.setState({
					isLoadingSmallModal : false,
					showSmallModal: false
				});
			}, 1500);
		}else if(size === 'medium') {
			this.setState({isLoadingModal : true});
			setTimeout(() => {
				// 로딩 완료!
				this.setState({
					isLoadingModal : false,
					showModal: false
				});
			}, 1500);
		}else if(size === 'large') {
			this.setState({isLoadingLargeModal : true});
			setTimeout(() => {
				// 로딩 완료!
				this.setState({
					isLoadingLargeModal : false,
					showLargeModal: false
				});
			}, 1500);
		}
	}


    render() {
        return (
            <DevCardView
                name={"Modal | ModalCard.js"}
                desc={[
                    "<code>title</code> does name modal's header",
                    "<code>show</code> flag value whether show or hide modal",
                    "<code>onCompleted</code> onCompleted function after modifying data ",
                ]}
                component={
                    <div>
                        <Button
							title={"Show Small Modal"}
                            className={"btn btn-primary"}
                            classNameDim={"btn btn-primary btn-primary-dim"}
                            style={{}}
                            disabled={this.state.isDisableBtnSmallModal}
                            onClick={ev => this.setState({showSmallModal: true})}
                        />
                        <Modal
                            title={"Small Modal Heading"}
                            size={"small"}
                            show={this.state.showSmallModal}
							isLoading={this.state.isLoadingSmallModal}
							onClickSubmit={ev => this.onClickSubmit("small")}
							onHide={() => this.setState({showSmallModal: false})}>
                            <h4>Text in a small modal</h4>
                        </Modal>

                        <Button
                            className={"btn btn-primary"}
                            classNameDim={"btn btn-primary btn-primary-dim"}
                            style={{marginLeft:"10px"}}
                            disabled={this.state.isDisableBtn}
                            onClick={this.onClickButton}
							title={"Show Modal"}
                        />
                        <Modal
                            title={"Modal Heading"}
                            show={this.state.showModal}
							onHide={() => this.setState({showModal: false})}
							isLoading={this.state.isLoadingModal}
							onClickSubmit={ev => this.onClickSubmit("medium")}>
                            <h4>Text in a modal</h4>
                        </Modal>

                        <Button
                            className={"btn btn-primary"}
                            classNameDim={"btn btn-primary btn-primary-dim"}
                            style={{marginLeft:"10px"}}
                            disabled={this.state.isDisableBtn}
                            onClick={this.onClickButtonLarge}
							title={"Show Large Modal"}
                        />
                        <Modal
                            title={"Large Modal Heading"}
                            size={"large"}
                            show={this.state.showLargeModal}
							onHide={() => this.setState({showLargeModal: false})}
							isLoading={this.state.isLoadingLargeModal}
							onClickSubmit={ev => this.onClickSubmit("large")}>
                            <h4>Text in a small modal</h4>
                        </Modal>
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;&#34;btn btn-primary&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;classNameDim=&#123;&#34;btn btn-primary btn-primary-dim&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;this.state.isDisableBtnSmallModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.onClickButtonSmallModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Show Small Modal&#34;&#125;</div>
                        <div className="nt">/&gt;</div>

                        <div className="nt">&lt;Modal</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Small Modal Heading&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;size=&#123;&#34;small&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;show=&#123;this.state.showModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onCompleted=&#123;this.onCompleted&#125;</div>
                        <div className="nt">&gt;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Text in a modal&lt;/h4&gt;</div>
                        <div className="nt">&lt;/Modal&gt;</div>

                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;&#34;btn btn-primary&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;classNameDim=&#123;&#34;btn btn-primary btn-primary-dim&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;marginLeft:&#34;10px&#34;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;this.state.isDisableBtn&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.onClickButton&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Show Modal&#34;&#125;</div>
                        <div className="nt">/&gt;</div>

                        <div className="nt">&lt;Modal</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Modal Heading&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;size=&#123;&#34;&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;show=&#123;this.state.showModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onCompleted=&#123;this.onCompleted&#125;</div>
                        <div className="nt">&gt;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Text in a modal&lt;/h4&gt;</div>
                        <div className="nt">&lt;/Modal&gt;</div>

                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;&#34;btn btn-primary&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;classNameDim=&#123;&#34;btn btn-primary btn-primary-dim&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;marginLeft:&#34;10px&#34;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;this.state.isDisableBtnLargeModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.onClickButtonLargeModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Show Large Modal&#34;&#125;</div>
                        <div className="nt">/&gt;</div>

                        <div className="nt">&lt;Modal</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Large Modal Heading&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;size=&#123;&#34;large&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;show=&#123;this.state.showModal&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onCompleted=&#123;this.onCompleted&#125;</div>
                        <div className="nt">&gt;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Text in a modal&lt;/h4&gt;</div>
                        <div className="nt">&lt;/Modal&gt;</div>

                    </div>
                }
            />
        );
    }
}

export default ModalCard;