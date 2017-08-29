import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip  from 'Component/common/tooltip/Tooltip';
import Img from 'Component/common/img/Img';
import TextUtil from 'Util/TextUtil';
import Const from 'Util/Const';

const COLORS = [
	'#e25f51',
	'#f26091',
	'#bb65ca',
	'#9572cf',
	'#7884cd',
	'#5b95f9',
	'#48c2f9',
	'#45d0e2',
	'#48b6ac',
	'#52bc89',
	'#9bce5f',
	'#d4e34a',
	'#feda10',
	'#f7c000',
	'#ffa800',
	'#ff8a60',
	'#c2c2c2',
	'#8fa4af',
	'#a2887e',
	'#a3a3a3',
	'#afb5e2',
	'#b39bdd',
	'#7cdeeb',
	'#bcaaa4',
	'#add67d'
];

class Avatar extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const className = "swv-avatar " + this.props.className;

		const fontSize = Math.floor(this.props.width/2);
		const lineHeight = Math.floor((fontSize/3)*2);
		const colorIdx = (this.props.fullName.charCodeAt(0) + this.props.fullName.length)%COLORS.length;

		let nameInitialStyle = {
			backgroundColor: COLORS[colorIdx],
			width: this.props.width,
			height: this.props.width,
			textAlign: 'center',
			verticalAlign: "middle",
			display:"inline-block",
			position:"relative",
			fontSize:`${fontSize}px`,
			lineHeight:`${lineHeight}px`,
			color: "white",
		};

		const nameInitialEl = (
			<div style={nameInitialStyle}>
				<table style={{width:`${this.props.width}px`,height:`${this.props.width}px`}}>
					<tbody>
						<tr>
							<td>
								{this.props.fullName.slice(0,1).toUpperCase()}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);

		const imageEl = (
			<div style={{display:"inline-block"}}>
				<Img
					width={this.props.width}
					height={this.props.width}
					src={this.props.src}
				/>
			</div>
		);

		const target = (TextUtil.isEmpty(this.props.src))?nameInitialEl:imageEl;

		return (
			<span className={className} style={this.props.style}>
				{this.props.hasTooltip &&
				<Tooltip
					msg={this.props.tooltipMsg}
					placement={this.props.tooltipPlacement}
					target={target}
				>
				</Tooltip>
				}
				{!this.props.hasTooltip &&
				<div>{target}</div>
				}
			</span>
		);
	}
}

Avatar.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	fullName: PropTypes.string.isRequired,
	src:PropTypes.string,
	width:PropTypes.number,
	hasTooltip:PropTypes.bool,
	tooltipMsg:PropTypes.string,
	tooltipPlacement:PropTypes.string,
};

Avatar.defaultProps = {
	className:"",
	style:{},
	fullName:"",
	src:"",
	width:50,
	hasTooltip:true,
	tooltipMsg:"",
	tooltipPlacement:Const.TOOLTIP_PLACEMENT.TOP,
};

export default Avatar;