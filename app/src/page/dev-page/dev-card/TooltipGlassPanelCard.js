import React, { Component } from 'react';
import Panel from 'Component/common/panel/Panel';
import TooltipGlassPanel from 'Component/common/panel/TooltipGlassPanel';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';
import Const from 'Util/Const';

class TooltipGlassPanelCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <DevCardView
                name={"TooltipPanel | TooltipPanelCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to TooltipPanelCard.js",
                ]}
                component={
                    <div>
                        <TooltipGlassPanel
                            title={"UPCOMING"}
                            tooltipMsg={"Upcoming panel displays events which will happen in a week from now."}>
							<div>
								<Panel
									panelType={Const.PANEL_TYPE.TRANSPARENT}
									title={(
										<div style={{color: '#4caf50'}} className="swv-no-focus">
											<i className="fa fa-birthday-cake" aria-hidden="true"/> BIRTHDAY
										</div>
									)}>
									<div
										style={{
											fontWeight:"200",
											fontSize: "16px",
											color: "#aaaaaa",
											textAlign: "center",
										}}
										className="swv-no-focus"
									>
										No Birthday Event
									</div>
								</Panel>

								<Panel
									panelType={Const.PANEL_TYPE.TRANSPARENT}
									title={(
										<div style={{color: "#0078c9"}} className="swv-no-focus">
											<i className="fa fa-plane" aria-hidden="true"/> LEAVE
										</div>
									)}>
									<div
										style={{
											fontWeight:"200",
											fontSize: "16px",
											color: "#aaaaaa",
											textAlign: "center",
										}}
										className="swv-no-focus"
									>
										No Leave Event
									</div>
								</Panel>

								<Panel
									panelType={Const.PANEL_TYPE.TRANSPARENT}
									title={(
										<div style={{color: "#ffa726"}} className="swv-no-focus">
											<i className="fa fa-user-plus" aria-hidden="true"/> NEW ARRIVAL
										</div>
									)}>
									<div
										style={{
											fontWeight:"200",
											fontSize: "16px",
											color: "#aaaaaa",
											textAlign: "center",
										}}
										className="swv-no-focus">
										No New Arrivals
									</div>
								</Panel>
							</div>
						</TooltipGlassPanel>
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

export default TooltipGlassPanelCard;