import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextUtil from 'Util/TextUtil';
import Const from 'Util/Const';
import 'style-loader!Component/common/panel/panel.less';

class Panel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let panelClass = "";
        switch (this.props.panelType) {
            case Const.PANEL_TYPE.DEFAULT: panelClass = "panel swv-panel panel-default"; break;
            case Const.PANEL_TYPE.TRANSPARENT: panelClass = "panel swv-panel panel-transparent"; break;
        }

        return (
            <div className={`${panelClass} ${this.props.className || ""}`}
				 ref={el => {
					 if(this.props.panelRef && el) {
						 this.props.panelRef(el);
					 }
				 }}>
				{(this.props.title || this.props.headerActionContainer) && <div className="panel-heading"> {/*헤더에는 title과 액션 버튼들만 있다고 가정. 만약 추가기능이 필요하다면, 기능을 추가한 컴포넌트 생성*/}
                	<h3 className="panel-title font-lato">
                        {this.props.title}
                    </h3>
					<div className="action-container">
						{this.props.headerActionContainer}
					</div>
                </div>}
                <div className="panel-body font-lato">
                    {this.props.children}
                </div>
				{this.props.footerActionContainer &&
					<div className="panel-footer">
						<div className="action-container">
							{this.props.footerActionContainer}
						</div>
					</div>
				}
			</div>
		);
	}
}

Panel.propTypes = {
    panelType: PropTypes.oneOf([Const.PANEL_TYPE.DEFAULT, Const.PANEL_TYPE.TRANSPARENT]),
	panelRef: PropTypes.func,
    title: PropTypes.oneOfType([ //https://www.npmjs.com/package/prop-types
		PropTypes.string,
		PropTypes.element
	]),
    className: PropTypes.string,
	headerActionContainer: PropTypes.element,
	footerActionContainer: PropTypes.element,
};

Panel.defaultProps = {
    panelType: Const.PANEL_TYPE.DEFAULT,
    title: "",
    className: "",
	headerActionContainer: null,
	footerActionContainer: null,
};

export default Panel;