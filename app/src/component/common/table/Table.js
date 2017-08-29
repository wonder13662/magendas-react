import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tr from 'Component/common/table/Tr';
import NumberUtil from 'Util/NumberUtil';
import ArrayUtil from 'Util/ArrayUtil';
import 'style-loader!Component/common/table/table.less';

class Table extends Component {

	constructor(props) {
		super(props);
		this.state = {
			headerTr:this.getHeaderTr(props.children),
			contentTrList:this.getContentTrList(props.children),
		};

		this.getHeaderTr = this.getHeaderTr.bind(this);
		this.getContentTrList = this.getContentTrList.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			headerTr:this.getHeaderTr(nextProps.children),
			contentTrList:this.getContentTrList(nextProps.children),
		});
	}

	getHeaderTr(children) {
		if(!ArrayUtil.isValid(children)) {
			return null;
		}
		if (!ArrayUtil.isArray(children)) {
			return children;
		}
		return children[0];
	}

	getContentTrList(children) {
		if(!ArrayUtil.isValid(children)) {
			return null;
		}

		const headerTr = this.getHeaderTr(children);
		if(!headerTr) {
			return null;
		}

		if(!ArrayUtil.isValid(headerTr.props.children)) {
			return;
		}

		const headerColumnCnt = headerTr.props.children.length;
		if(!NumberUtil.isUnsigned(headerColumnCnt)) {
			return null;
		}
		if (children.length < 2) {
			return null;
		}

		const contentTrList = children.slice(1, children.length);
		if(!ArrayUtil.isValid(contentTrList)) {
			return null;
		}

		// TODO : 타입 검사가 필요함.

		return contentTrList.map((content, idx) => {
			if (content === null) {
				return null;
			}

			if (ArrayUtil.isArray(content)) {
				return content.map((item, idx) => {
					const style = (!item.props.style)?{}:item.props.style;
					return (
						<Tr
							key={idx}
							columnCnt={headerColumnCnt}
							style={style}
							className={item.props.className}>
							{item.props.children}
						</Tr>
					);
				});
			} else {

				if(!content.props.style) {
					content.props.style = {};
				}

				return (
					<Tr
						key={idx}
						columnCnt={headerColumnCnt}
						style={content.props.style}
						className={content.props.className}>
						{content.props.children}
					</Tr>
				);
			}
		});
	}

	render() {
		const classNameHover = (this.props.hover)?"table-hover":"";
		const classNameStripe = (this.props.stripe)?"table-striped":"";
		const classNameBordered = (this.props.bordered)?"table-bordered":"";
		const classNameNoBorderTop = (ArrayUtil.isValid(this.state.headerTr) && 0 < this.state.headerTr.length && this.state.headerTr[0].props.hide)?"swv-table-no-border-top":"";

		const className = `table swv-table ${this.props.className} ${classNameHover} ${classNameStripe} ${classNameBordered} ${classNameNoBorderTop}`;

		return (
			<table className={className} style={this.props.style}>
				{(this.state.headerTr) &&
				<thead>
					{this.state.headerTr}
				</thead>
				}
				{(ArrayUtil.isValid(this.state.contentTrList) && (0 < this.state.contentTrList.length)) &&
				<tbody>
					{this.state.contentTrList}
				</tbody>
				}
			</table>
		);
	}
}

Table.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	hover:PropTypes.bool,
	stripe:PropTypes.bool,
	bordered:PropTypes.bool,
};

Table.defaultProps = {
	className:"",
	style:{},
};

export default Table;