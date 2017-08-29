import React, { Component } from 'react';
import Panel from 'Component/common/panel/Panel';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';
import Const from 'Util/Const';
import Button from "../../../component/common/button/Button";

class PanelCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <DevCardView
                name={"Panel | PanelCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to PanelCard.js",
                ]}
                component={
                    <div>
                        <Panel
                            panelType={Const.PANEL_TYPE.DEFAULT}
							title={"Panel"}
							headerActionContainer={
								<div>
									<button className="btn btn-sm btn-primary">ACTION 1</button>
									<button className="btn btn-sm btn-default">ACTION 2</button>
								</div>
							}
							footerActionContainer={
								<div>
									<button className="btn btn-sm btn-default">ACTION 1</button>
								</div>
							}>
							<div
								style={{
									fontWeight:"200",
									fontSize: "16px",
									color: "#aaaaaa",
									textAlign: "center",
								}}
								className="swv-no-focus"
							>
								CONTENT
							</div>
						</Panel>
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

export default PanelCard;