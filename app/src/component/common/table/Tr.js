import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Th from 'Component/common/table/Th';
import Td from 'Component/common/table/Td';
import ArrayUtil from 'Util/ArrayUtil';
import NumberUtil from 'Util/NumberUtil';
import _ from 'underscore';

class Tr extends Component {

	constructor(props) {
		super(props);

		// 1. th인지 td인지 확인.
		const headerList = this.getHeaderList(props.children);
		const contentList = this.getContentList(props.children);

		this.state = {
			headerList:headerList,
			contentList:contentList,
		};

		this.getHeaderList = this.getHeaderList.bind(this);
		this.getContentList = this.getContentList.bind(this);
		this.getEmptyTd = this.getEmptyTd.bind(this);
		this.getCloneTd = this.getCloneTd.bind(this);
		this.isOutOfRange = this.isOutOfRange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const headerList = this.getHeaderList(nextProps.children);
		const contentList = this.getContentList(nextProps.children, headerList);

		this.state = {
			headerList:headerList,
			contentList:contentList,
		};
	}

	getHeaderList(children) {
		if(!ArrayUtil.isValid(children)) {
			return [];
		}

		// 유효하지 않은 child는 제외합니다.
		children = _.filter(children, (child) => {
			return !!child;
		});

		if (!Array.isArray(children)) {
			children = [children];
		}
		return _.filter(children, (child) => {
			return (child.type === Th);
		});
	}

	getEmptyTd(key) {
		return (
			<Td key={key}>&nbsp;</Td>
		);
	}

	getCloneTd(td, key) {
		return (
			<Td key={key} {...td.props}/>
		);
	}


	getContentList(children) {

		if (!!children && !Array.isArray(children)) {
			// 낱개의 객체가 전달된 경우의 처리. React 내부에서는 chlidren이 1개인 경우, 객체로 전달.
			children = [children];
		}

		if(!ArrayUtil.isValid(children)) {
			return [];
		}

		// 유효하지 않은 child는 제외합니다.
		children = _.filter(children, (child) => {
			return !!child;
		});

		const contentList = _.filter(children, (child) => {
			return (child.type === Td);
		});

		let contentListNext = [];
		let cursor = 0;
		for(let content of contentList) {

			const offset = content.props.offset;
			const colSpan = content.props.colSpan;

			if(NumberUtil.isUnsigned(offset) && 0 < offset) {
				// offset만큼 오른쪽으로 이동.
				for(let i=0;i < offset; i++) {
					cursor++;
					contentListNext.push(this.getEmptyTd(cursor));
				}
			}

			// 다음 위치로 이동
			cursor++;
			const tdClone = this.getCloneTd(content, cursor);
			contentListNext.push(tdClone);

			if(NumberUtil.isUnsigned(colSpan) && 1 < colSpan) {
				// colSpan만큼 넓어집니다. 넓어지는 너비 만큼 이동하는 것으로 처리.
				cursor += (colSpan - 1);
			}

			// 커서가 리스트 범위를 벗어나면 중단.
			if(this.isOutOfRange(cursor)) {
				break;
			}
		}

		// 사용자가 header column보다 적은 Td 엘리먼트를 줬을 경우. ex) 사용되지 않는 뒷 column들을 귀찮아서 지정하지 않은 경우.
		if(cursor <= this.props.columnCnt) {
			const columnCntToGo = this.props.columnCnt - cursor;
			for(let i = 0; i < columnCntToGo; i++) {
				// 다음 위치로 이동. 빈 컬럼을 추가합니다.
				cursor++;
				contentListNext.push(this.getEmptyTd(cursor));

				// 커서가 리스트 범위를 벗어나면 중단.
				if(this.isOutOfRange(cursor)) {
					break;
				}
			}
		}

		return contentListNext;
	}

	isOutOfRange(cursor) {
		if(!NumberUtil.isUnsigned(cursor)) {
			return false;
		}

		return ((this.props.columnCnt - 1) < cursor)?true:false;
	}

	render() {
		const className = `swv-tr ${this.props.className}`;

		let childList = null;
		if(ArrayUtil.isValid(this.state.headerList)) {
			childList = this.state.headerList;
		} else if(ArrayUtil.isValid(this.state.contentList)) {
			childList = this.state.contentList;
		}

		return (
			<tr className={className} style={this.props.style}>
				{childList}
			</tr>
		);
	}
}

Tr.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	columnCnt:PropTypes.number.isRequired
};

Tr.defaultProps = {
	className:"",
	style:{},
	columnCnt:-1,
};

export default Tr;