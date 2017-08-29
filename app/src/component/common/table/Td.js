import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from 'Util/Const';
import NumberUtil from 'Util/NumberUtil';
import _ from 'underscore';

import 'style-loader!Component/common/table/table.less';

const { CSS_TEXT_ALIGN } = Const;

class Td extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
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
		const className = `${this.props.className} ${this.getClassNameTextAlign()}`;
		const style = (NumberUtil.isUnsigned(this.props.width))?_.extend(this.props.style, {width:`${this.props.width}%`}):this.props.style;
		return (
			<td className={className} style={style} colSpan={this.props.colSpan}>{this.props.children}</td>
		);
	}
}

Td.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	width:PropTypes.number,
	left:PropTypes.bool,
	center:PropTypes.bool,
	right:PropTypes.bool,
	offset:PropTypes.number,
	colSpan:PropTypes.number,
};

Td.defaultProps = {
	className:"",
	style:{},
	width:0,
	offset:0,
	colSpan:0,
};

export default Td;