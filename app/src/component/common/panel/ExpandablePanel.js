import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'Component/common/panel/Panel';
import Const from 'Util/Const';

const { PANEL_TYPE } = Const;

export default class ExpandablePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		};
		this.renderItems = this.renderItems.bind(this);
		this.getEmptyItem = this.getEmptyItem.bind(this);
		this.getExpandBtn = this.getExpandBtn.bind(this);
	}

	getEmptyItem() {
		return (
			<div className="empty-item">
				<p>{this.props.emptyMessage}</p>
			</div>
		);
	}

	renderItems() {
		const children = this.props.children;

		if(!children) {
			return this.getEmptyItem();
		} else if(typeof children.length === 'number') { //children is array
			if (children.length === 0) {
				return this.getEmptyItem();
			}
		} else { //children is object --> single child
			return children;
		}

		let items = [];
		const loopCount = this.state.isExpanded? children.length : this.props.itemLimitCount;
		for(let i=0; i < loopCount; i++){
			items.push(children[i]);
		}
		return items;
	}

	getExpandBtn() {
		if(!this.props.children) return;
		if(!this.props.children.length) return;
		if(this.props.children.length <= this.props.itemLimitCount) return;

		let btnClass = null;
		switch (this.props.panelType){
			case PANEL_TYPE.TRANSPARENT:
				btnClass = "panel-footer transparent";
				break;
			default:
				btnClass = "panel-footer";
		}

		return (
			<div
				className={btnClass}
				onClick={ev => {
					ev.preventDefault();
					this.setState((prevState, props) => ({isExpanded: !prevState.isExpanded}) );
				}} >
				<i className={this.state.isExpanded? "fa fa-angle-up" : "fa fa-angle-down"}/>
			</div>
		);
	}

	render() {

		return (
			<Panel
				title={this.props.title}
				panelType={this.props.panelType}
				panelRef={this.props.panelRef}
				className={`panel-expandable ${this.props.className}`}
				headerActionContainer={this.props.headerActionContainer}
				footerActionContainer={this.props.footerActionContainer}>
				{this.renderItems()}
				{this.getExpandBtn()}
			</Panel>
		);
	}
}

ExpandablePanel.propTypes = {
	/* from Panel */
	panelType: PropTypes.oneOf([PANEL_TYPE.DEFAULT, PANEL_TYPE.TRANSPARENT]),
	panelRef: PropTypes.func,
	title: PropTypes.oneOfType([ //https://www.npmjs.com/package/prop-types
		PropTypes.string,
		PropTypes.element
	]),
	className: PropTypes.string,
	headerActionContainer: PropTypes.element,
	footerActionContainer: PropTypes.element,

	/* for Current Component */
	itemLimitCount: PropTypes.number,
	emptyMessage: PropTypes.string,
};

ExpandablePanel.defaultProps = {
	/* from Panel */
	panelType: "default",
	title: "",
	className: "",
	headerActionContainer: null,
	footerActionContainer: null,

	/* for Current Component */
	itemLimitCount: 4,
	emptyMessage: "No Data",
};