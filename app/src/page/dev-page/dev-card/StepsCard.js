import React, { Component } from 'react';
import Steps from 'Component/common/progressbar/Steps';
import Step from 'Component/common/progressbar/Step';
import DevCardView from 'DevPage/common/DevCardView';
import Const from 'Util/Const';

const STEP_STATUS = Const.STEP_STATUS;
const PROGRESS_ONBOARDING_NAME = Const.PROGRESS_ONBOARDING_NAME;

class StepsCard extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <DevCardView
                name={"Steps | StepsCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to StepsCard.js",
                ]}
                component={
                    <div>
                        <div style={{height:"70px",borderBottom:"1px solid #eeeeee"}}>
                            <Steps>
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_PASSWORD} status={STEP_STATUS.ONGOING} />
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_REPORT_TO} status={STEP_STATUS.WAIT} />
                                <Step title={PROGRESS_ONBOARDING_NAME.GO_APP_HOME} status={STEP_STATUS.WAIT} />
                            </Steps>
                        </div>
                        <div style={{height:"70px",borderBottom:"1px solid #eeeeee"}}>
                            <Steps>
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_PASSWORD} status={STEP_STATUS.FINISH} />
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_REPORT_TO} status={STEP_STATUS.ONGOING} />
                                <Step title={PROGRESS_ONBOARDING_NAME.GO_APP_HOME} status={STEP_STATUS.WAIT} />
                            </Steps>
                        </div>
                        <div style={{height:"70px"}}>
                            <Steps>
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_PASSWORD} status={STEP_STATUS.FINISH} />
                                <Step title={PROGRESS_ONBOARDING_NAME.SET_REPORT_TO} status={STEP_STATUS.FINISH} />
                                <Step title={PROGRESS_ONBOARDING_NAME.GO_APP_HOME} status={STEP_STATUS.ONGOING} />
                            </Steps>
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

export default StepsCard;