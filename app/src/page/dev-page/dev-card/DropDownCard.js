import React, { Component } from 'react';
import Modal from 'Component/common/modal/Modal';
import DropDown from 'Component/common/dropdown/DropDown';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class DropDownCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:"John Doe",
            id:12,
            email:"john.doe@myapp.com",
            phoneNumber:"120-1112-3322",
            showModal:false
        };

        this.onClickButton = this.onClickButton.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onClickButton(event) {
        event.stopPropagation();

        this.setState({
            showModal:true
        });
    }

	onHide() {
		this.setState({
			showModal:false
		});
        // console.log("onCompleted / event : ",event);
    }

    render() {
        return (
            <DevCardView
                name={"DropDown"}
                desc={[
                    "<code>title</code> text link which awake dropdown-list",
                ]}
                component={
                    <div>
                        <DropDown title={this.state.name}>
                            <li><a href={"/dev/common?id="+this.state.id}>Profile</a></li>
                            <li><a onClick={this.onClickButton}>{this.state.email}</a></li>
							<li role="separator" className="divider"></li>
                            <li><a>{this.state.phoneNumber}</a></li>
                        </DropDown>
                        <Modal
                            title={"Modal Heading"}
                            show={this.state.showModal}
                            onHide={this.onHide}>
                            <h4>Text in a modal</h4>
                        </Modal>
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;DropDown title=&#123;this.state.name&#125;&gt;</div>
                        <div className="nt">&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a href=&#123;&#34;/dev/common?id=&#34;+this.state.id&#125;&gt;Profile&lt;/a&gt;&lt;/li&gt;</div>
                        <div className="nt">&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a onClick=&#123;this.onClickButton&#125;&gt;&#123;this.state.email&#125;&lt;/a&gt;&lt;/li&gt;</div>
                        <div className="nt">&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a&gt;&#123;this.state.phoneNumber&#125;&lt;/a&gt;&lt;/li&gt;</div>
                        <div className="nt">&lt;/DropDown&gt;</div>
                    </div>
                }
            />
        );
    }
}

export default DropDownCard;