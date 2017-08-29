import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlassPanel from 'Component/common/panel/GlassPanel';
import Tooltip from 'Component/common/tooltip/Tooltip';
import 'style-loader!Component/common/panel/panel.less';

class TooltipGlassPanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <GlassPanel
				title={
					<div>
						<div style={ {display: 'inline-block'} }>{this.props.title}</div>
						<Tooltip
							msg={this.props.tooltipMsg}
							target={
								<i className="fa fa-question-circle swv-tooltip-target"
								   aria-hidden="true"
								   style={{marginLeft:"3px"}}/>
							}/>
					</div>
				}>
				{this.props.children}
			</GlassPanel>
        );
    }
}

// TooltipPanel은 GlassPanel을 확장한 컴포넌트.
// GlassPanel이 제공하는 모든 props들을 그대로 외부에 노출시켜야 함
TooltipGlassPanel.propTypes = {
	//GlassPanel이 제공하는 props
	title: PropTypes.oneOfType([ //https://www.npmjs.com/package/prop-types
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	className: PropTypes.string,
	headerActionContainer: PropTypes.element,
	footerActionContainer: PropTypes.element,

	//TooltipPanel에서 추가되는 props
    tooltipMsg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired //안쓰면 TooltipPanel을 사용할 의미가 사라짐
};

TooltipGlassPanel.defaultProps = {
	//GlassPanel이 제공하는 props
	title: "",
	className: "",
	headerActionContainer: null,
	footerActionContainer: null,

	//TooltipPanel에서 추가되는 defaultProps는 하단에 정의
};

export default TooltipGlassPanel;