import React, { Component } from 'react';
import Panel from 'Component/common/panel/Panel';
import TooltipPanel from 'Component/common/panel/TooltipPanel';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';
import Const from 'Util/Const';

class TooltipPanelCard extends Component {

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
                    "<code>Not available</code> Please refer to TooltipPanelCard.js | Tooltip으로 감싸는 chlidren은 반드시 html 기본 객체(ex : <div>{react.component}</div>)이어야 합니다. React Component를 직접 children으로 넘기면 동작하지 않습니다.",
                ]}
                component={
                    <div>
                        <TooltipPanel
                            title={"UPCOMING"}
                            tooltipChildren={(
                                <i
                                    className="fa fa-question-circle swv-tooltip-panel-layout-card"
                                    aria-hidden="true"
                                    style={{marginLeft:"3px"}}
                                />
                            )}
                            tooltipMsg={"Upcoming panel displays events which will happen in a week from now."}
                            content={(
                                <div>
                                    <Panel
                                        panelType={Const.PANEL_TYPE.TRANSPARENT}
                                        header={(
                                            <div style={{color: '#4caf50'}} className="swv-no-focus">
                                                <i className="fa fa-birthday-cake" aria-hidden="true"/> BIRTHDAY
                                            </div>
                                        )}
                                        content={(
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
                                        )}
                                    />

                                    <Panel
                                        panelType={Const.PANEL_TYPE.TRANSPARENT}
                                        header={(
                                            <div style={{color: "#0078c9"}} className="swv-no-focus">
                                                <i className="fa fa-plane" aria-hidden="true"/> LEAVE
                                            </div>
                                        )}
                                        content={(
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
                                        )}
                                    />

                                    <Panel
                                        panelType={Const.PANEL_TYPE.TRANSPARENT}
                                        header={(
                                            <div style={{color: "#ffa726"}} className="swv-no-focus">
                                                <i className="fa fa-user-plus" aria-hidden="true"/> NEW ARRIVAL
                                            </div>
                                        )}
                                        content={(
                                            <div
                                                style={{
                                                    fontWeight:"200",
                                                    fontSize: "16px",
                                                    color: "#aaaaaa",
                                                    textAlign: "center",
                                                }}
                                                className="swv-no-focus"
                                            >
                                                No New Arrivals
                                            </div>
                                        )}
                                    />
                                </div>
                            )}
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

export default TooltipPanelCard;