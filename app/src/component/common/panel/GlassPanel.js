import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'Component/common/panel/Panel';
import Const from 'Util/Const';
import 'style-loader!Component/common/panel/panel.less';

class GlassPanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {

    	return (
            <Panel
                panelType={Const.PANEL_TYPE.TRANSPARENT}
				title={this.props.title}
				headerActionContainer={this.props.headerActionContainer}
				footerActionContainer={this.props.footerActionContainer}>
				<div className="glass-panel-layout content">
					{this.props.children}
				</div>
			</Panel>
        );
    }
}

//GlassPanel은 Panel의 필수 prop들을 모두 갖고 있어야 함.
//GlassPanel은 panelType이 TRANSPARENT로 강제 되어있음
GlassPanel.propTypes = {
    //tooltipChildren:PropTypes.object, //GlassPanel은 tooltip에 대한 정보는 몰라야 함
    //tooltipMsg:PropTypes.string, 		//GlassPanel은 tooltip에 대한 정보는 몰라야 함
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	className: PropTypes.string,
	headerActionContainer: PropTypes.element,
	footerActionContainer: PropTypes.element,
};

GlassPanel.defaultProps = {
    //tooltipChildren:null,
    //tooltipMsg:"Tooltip panel msg is required!",
	title: "",
	className: "",
	headerActionContainer: null,
	footerActionContainer: null
};

export default GlassPanel;