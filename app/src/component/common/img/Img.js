import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberUtil from 'Util/NumberUtil';
import TextUtil from 'Util/TextUtil';
import 'style-loader!Component/common/img/img.less';

class Img extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	drawImg() {

		return (
			<img
				alt={this.props.alt}
				className={this.props.className}
				style={this.props.style}
				src={this.props.src}
			/>
		);

	}

	drawNoImg() {

		// 아래 2개 값은 width,height에 따라 변경.
		const fontSize = parseInt(this.props.width/6);
		const padding = parseInt((this.props.height - fontSize)/2);
		const style =
		{
			width:`${this.props.width}px`,
			height:`${this.props.height}px`,
			fontSize: `${fontSize}px`,
			lineHeight: `${fontSize}px`,
			padding: `${padding}px 0px`,
		};

		return (
			<div
				className={`swv-img swv-no-img ${this.props.className}`}
				style={style}>
				<div>No Image</div>
			</div>
		);
	}

	drawOnLoading() {
		return null;
	}

	render() {
		const style = this.props.style;
		if(NumberUtil.isUnsigned(this.props.width)) {
			style["width"]=`${this.props.width}px`;
		}
		if(NumberUtil.isUnsigned(this.props.height)) {
			style["height"]=`${this.props.height}px`;
		}

		let img = null;
		if(TextUtil.isEmpty(this.props.src)) {
			// 이미지 주소가 없습니다. '이미지 없음'을 노출.
			img = this.drawNoImg();
		} else {
			img = this.drawImg();
		}

		return (
			<div className={"swv-img"}>{img}</div>
		);
	}
}

Img.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	src:PropTypes.string,
	width:PropTypes.number,
	height:PropTypes.number,
};

Img.defaultProps = {
	className:"",
	style:{},
	src:"",
	width:50,
	height:50,
};

export default Img;