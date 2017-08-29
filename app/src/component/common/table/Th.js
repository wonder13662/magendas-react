import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from 'Util/Const';
import NumberUtil from 'Util/NumberUtil';

import 'style-loader!Component/common/table/table.less';

const { CSS_TEXT_ALIGN } = Const;

class Th extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};

		this.getClassNameTextAlign = this.getClassNameTextAlign.bind(this);
	}

	getClassNameTextAlign() {
		if(this.props.left) {
			return CSS_TEXT_ALIGN.LEFT;
		} else if(this.props.center) {
			return CSS_TEXT_ALIGN.CENTER;
		} else if(this.props.right) {
			return CSS_TEXT_ALIGN.RIGHT;
		}
		return CSS_TEXT_ALIGN.LEFT;
	}

	render() {
		let className = this.getClassNameTextAlign(this.props.textAlign);
		className = (this.props.hide)?`${className} swv-th-hide ${this.props.className}`:`${className} ${this.props.className}`;

		let style = (NumberUtil.isUnsigned(this.props.width))?Object.assign(this.props.style, {width:`${this.props.width}%`}):this.props.style;

		return (
			<th className={className} style={style}>{this.props.children}</th>
		);
	}
}

Th.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	width:PropTypes.number,
	left:PropTypes.bool,
	center:PropTypes.bool,
	right:PropTypes.bool,
	hide:PropTypes.bool,
};

Th.defaultProps = {
	className:"",
	style:{},
	width:-1,
	hide:false,
};

export default Th;