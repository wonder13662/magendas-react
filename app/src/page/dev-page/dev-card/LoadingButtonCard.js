import React, { Component } from 'react';
import LoadingButton from 'Component/common/button/LoadingButton';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class LoadingButtonCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisable:false,
			isRemoving:false,
        };

        this.request = this.request.bind(this);
        this.requestRemove = this.requestRemove.bind(this);
    }

    request() {
        // 로딩 시작!
        this.setState({
            isLoading:true
        });
        setTimeout(() => {
            // 로딩 완료!
            this.setState({
                isLoading:false
            });
        }, 3000);
    }

	requestRemove() {
		// 로딩 시작!
		this.setState({
			isRemoving:true
		});
		setTimeout(() => {
			// 로딩 완료!
			this.setState({
				isRemoving:false
			});
		}, 3000);
	}


    render() {
        return (
            <DevCardView
                name={"Loading Button"}
                desc={[
                    "<code>title</code> set Button title - Button name on view",
                    "<code>loadingTitle</code> set Button title - Button name on loading progress",
                    "<code>lbClass</code> set CSS Class which apply to button",
                    "<code>lbStyle</code> set CSS Style which apply to button",
                    "<code>isLoading</code> set flag showing loading progress bar",
                    "<code>onClick</code> set callback when button fires callback after clicked.",
                ]}
                component={
                    <div>
                        <LoadingButton
                            title="Delete"
                            loadingTitle="Please Wait.."
                            className="btn btn-danger"
                            style={{}}
                            isLoading={this.state.isLoading}
                            onClick={this.request}
                        />
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;Button</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&#34;Delete&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;loadingTitle=&#123;&#34;Please Wait..&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;lbClass=&#123;&#34;btn btn-danger&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;lbStyle=&#123;&#123;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;isLoading=&#123;this.state.isLoading&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#123;this.request&#125;</div>
                        <div className="nt">/&gt;</div>
                    </div>
                }
            />
        );
    }
}

export default LoadingButtonCard;