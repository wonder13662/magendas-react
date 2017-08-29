import React, { Component } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Const from 'Util/Const';
import JqueryUtil from 'Util/JqueryUtil';
import TextUtil from 'Util/TextUtil';
import Util from 'Util/Util';
import SearchTextFilter from 'Component/common/filter/SearchTextFilter';
import 'style-loader!Component/common/dropdown/dropdown-filter.less';

const DROPDOWN_BUTTON_TYPE = Const.DROPDOWN_BUTTON_TYPE;
const emptyItem = {value:-1, title:"No item"};

class DropDownFilter extends Component {

	constructor(props) {
		super(props);

		this.state = {
			id:TextUtil.getUniqueId(),
			width:props.width,
			itemList:this.props.itemList,
			itemSelected:(props.itemList && (0 < props.itemList.length))?props.itemList[1]:emptyItem,
			isResetSearchText:false,
			buttonType:props.buttonType,
			listStyle:{display:"none"},
			collisionWatcher:null,
			value:null
		};
		this.onChange = this.onChange.bind(this);
		this.doFilter = this.doFilter.bind(this);
		this.onClickItem = this.onClickItem.bind(this);
		this.onClickShowDropDown = this.onClickShowDropDown.bind(this);
		this.clearSearchText = this.clearSearchText.bind(this);
		this.onClickBody = this.onClickBody.bind(this);
	}

	componentDidMount() {
		const collisionWatcher = JqueryUtil.addCollisionWatcher(this.onClickBody);
		this.setState({ collisionWatcher });
	}

	componentWillUnmount() {
		if(this.state.collisionWatcher) {
			this.state.collisionWatcher.unbindEventCollision();
		}
	}

	componentWillReceiveProps(nextProp) {
		if(nextProp.value) {
			this.setState({
				value: nextProp.value
			});
		}
	}

	onClickBody(event) {
		if(!this.state.collisionWatcher) {
			return;
		}

		const isInsideDropDownList = JqueryUtil.isInside(event, $(this.dropDownList));
		const isInsideButton= JqueryUtil.isInside(event, $(this.button));

		if( !isInsideDropDownList && !isInsideButton ) {
			this.setFixedList(false);
			this.state.collisionWatcher.unbindEventCollision();
		}
	}

	onChange(param) {
		this.doFilter(param.userInput);
	}

	doFilter(keyword) {
		if(!TextUtil.isEmpty(keyword)) {
			const itemListFiltered =
				_.filter(this.props.itemList, (item) => {

					if(item && item.title) {
						return (-1 < item.title.toLowerCase().indexOf(keyword.toLowerCase()));
					}

					return false;
				});

			this.setState({
				itemList:itemListFiltered
			});
			return;
		}

		this.setState({
			itemList:this.props.itemList
		});
	}

	onClickItem(event) {
		event.stopPropagation();
		let selectedValue = event.target.id;
		let selectedOption = _.findWhere(this.props.itemList, {value: Number(selectedValue)});
		this.props.onChange(selectedOption);

	}

	onClickShowDropDown(event) {

		event.stopPropagation();

		if(this.state.listStyle && this.state.listStyle.display === "block") {
			// 리스트가 화면에 보임. 리스트 가림.
			this.setFixedList(false);
			if(this.state.collisionWatcher) {
				this.state.collisionWatcher.unbindEventCollision();
			}
		} else {
			// 리스트가 화면에 보이지 않음. 리스트 표시.
			this.doFilter("");
			this.clearSearchText();
			this.setFixedList(true);
			if(this.state.collisionWatcher) {
				this.state.collisionWatcher.bindEventCollision();
			}
		}
	}

	setFixedList(isFixed) {
		if(isFixed) {
			this.setState({listStyle:{display:"block"}});
		} else {
			this.setState({listStyle:{display:"none"}});
		}
	}

	clearSearchText() {
		this.setState({isResetSearchText:true},() => {
			this.setState({isResetSearchText:false});
		});
	}

	getStyleSearchTextFilter() {
		return {
			border:"0px",
			boxShadow:"none",
		};
	}

	drawItemList() {

		const listItemWidth = `${this.state.width}px`;
		const listItemStyle = {
			width:listItemWidth
		};

		const searchTextFilterWidth = `${(this.state.width - 10)}px`;
		const searchTextFilterStyle = {
			width:searchTextFilterWidth
		};

		const boxStyle = {
			padding:"0px 5px 0px 20px"
		};

		// 리스트 복사.
		let listItemsClone = Util.deepCopy(this.state.itemList);
		listItemsClone.unshift({},{});

		const listItems = listItemsClone.map((item, index) => {
			let node;
			if(0 === index) {
				node = (
					<li key={index} id={index} style={listItemStyle}>
						<SearchTextFilter
							text={""}
							message={""}
							placeholder={this.props.placeHolderSearchBar}
							style={this.getStyleSearchTextFilter()}

							boxStyle={boxStyle}
							itemList={this.props.itemList}
							onChange={this.onChange}
							isReset={this.state.isResetSearchText}
							searchIcon
						/>
					</li>
				);
			} else if(1 === index) {
				node = (
					<li key={index} id={index} role="separator" className="swv-divider divider"></li>
				);
			} else {
				let checkedStatus = (this.state.value === item.value);
				node = (
					<li key={index} id={item.value} style={listItemStyle}>
						<label style={{width:"100%",fontWeight:"normal"}}>
							<input
								id={item.value}
								type={this.props.inputType}
								onChange={this.onClickItem}
								name={item.title}
								checked={checkedStatus}/>
							{item.title}
						</label>
					</li>
				);
			}

			return node;
		});

		return (
			<ul
				className="dropdown-menu no-bullet dropdown-filter"
				aria-labelledby={`dropdownMenu${this.state.id}`}
				aria-expanded="true"
				style={this.state.listStyle}
				ref={(dropDownList) => { this.dropDownList = dropDownList; }}
			>
				{listItems}
			</ul>
		);
	}

	drawButton() {

		let buttonNode;
		const styleButton = (0 < this.props.buttonWidth)?{width:`${this.props.buttonWidth}px`}:{width:'100%'};
		if(DROPDOWN_BUTTON_TYPE.ANCHOR === this.props.buttonType) {
			// anchor
			buttonNode = (
				<a
					href="#"
					className="dropdown-toggle"
					data-toggle="dropdown"
					ref={(button) => { this.button = button; }}
					onClick={this.onClickShowDropDown}
					style={styleButton}
				>
					{this.state.itemSelected.title}
					<span className="caret"/>
				</a>
			);

		} else if(DROPDOWN_BUTTON_TYPE.BUTTON === this.props.buttonType) {
			// button
			//const btnChildren = (this.props.buttonChildren)?this.props.buttonChildren:(<div>Click Me!</div>);
			const btnTitle = this.props.buttonPlaceholder;

			buttonNode = (
				<button
					id={`dropdownMenu${this.state.id}`}
					className="btn btn-default dropdown-toggle"
					type="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					ref={(button) => { this.button = button; }}
					onClick={this.onClickShowDropDown}
					style={styleButton}
				>
					{btnTitle}
					<span className="caret"/>
				</button>

			);
		}

		return (buttonNode);
	}

	render() {
		return(
			<div className="dropdown user-dropdown swv-dropdown-filter">
				{this.drawButton()}
				{this.drawItemList()}
			</div>
		);
	}
}

DropDownFilter.defaultProps = {
	text:"No name",
	buttonPlaceholder: "Choose From Options",
	buttonChildren:null,
	placeHolderSearchBar: "Search anything",
	itemList:[],
	buttonType: DROPDOWN_BUTTON_TYPE.ANCHOR,
	value:null,
	inputType: "radio"
};

DropDownFilter.propTypes = {
	text: PropTypes.string,
	buttonWidth: PropTypes.number,
	buttonPlaceholder: PropTypes.string,
	buttonChildren: PropTypes.object,
	placeHolderSearchBar: PropTypes.string,
	itemList: PropTypes.array,
	buttonType: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	inputType: PropTypes.string
};

export default DropDownFilter;