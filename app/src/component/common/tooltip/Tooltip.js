import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RBOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import RBTooltip from 'react-bootstrap/lib/Tooltip';
import Const from 'Util/Const';
import 'style-loader!Component/common/tooltip/tooltip.less';

class Tooltip extends Component {

    constructor(props) {
        super(props);
    }

    render() {
    	let classNameLayout = "swv-panel-layout";
    	if(Const.TOOLTIP_PLACEMENT.TOP === this.props.placement) {
			classNameLayout = "swv-panel-layout-top";
		} else if(Const.TOOLTIP_PLACEMENT.RIGHT === this.props.placement) {
			classNameLayout = "swv-panel-layout-right";
		}

        const tooltip = (
            <RBTooltip id={"tooltip"} className={`tooltip swv-tooltip ${classNameLayout}`}>{this.props.msg}</RBTooltip>
        );

        const children = (this.props.children)?this.props.children:(<div>Children cannot be empty!</div>);
		return (
            <RBOverlayTrigger
				placement={this.props.placement}
				overlay={<RBTooltip id="tooltip" className="tooltip swv-tooltip">{this.props.msg}</RBTooltip>}>
                {this.props.target}
            </RBOverlayTrigger>
        );
    }
}

Tooltip.propTypes = {
	//내부에서는 RBOverlayTrigger이지만, 외부에서는 Tooltip으로 가져다 씀
	//Tooltip의 this.props.children은 툴팁 내 메세지부분이라고 오독할 가능성 큼
	target: PropTypes.element.isRequired,
    msg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	placement: PropTypes.string
};


Tooltip.defaultProps = {
	placement: 'right'
};

export default Tooltip;