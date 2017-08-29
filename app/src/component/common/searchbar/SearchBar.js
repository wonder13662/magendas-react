import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Input from 'Component/common/input/Input';

import 'style-loader!Component/common/searchbar/searchbar.less';

const KEY_DOWN_ARROW = 40;
const KEY_UP_ARROW = 38;
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query,
			itemList: this.props.itemList,
			showItemList: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

	componentWillReceiveProps(nextProps) {
    	this.setState({
			query: nextProps.query || "",
			itemList: nextProps.itemList || []
		});
	}

    onChange({ userInput }) {
		const hasItem = _.find(this.state.itemList, (item) => item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
        this.setState({
			query: userInput,
			showItemList: !!hasItem
		}, () => {
			if(this.props.onChange) {
				this.props.onChange({ userInput });
			}
		});
    }

    onClickItem(ev, item) {
		ev.stopPropagation();
    	this.setState({
			showItemList: false,
			query: item.name
		}, () => {
			if(this.props.onClickItem) {
				this.props.onClickItem(item);
			}
		});
    }

    onKeyDown(ev) {
		const keyCode = ev.keyCode;
		if (keyCode === KEY_DOWN_ARROW) {
			let selected = $(".selected");
			$(".search-result-container li").removeClass("selected");
			if (selected.length === 0) {
				selected = $(".search-result-list-item");
				if (selected.length > 0) {
					$(selected[0]).addClass('selected');
				}
			} else {
				if (selected.next().length === 0) {
					selected.siblings().first().addClass("selected");
				} else {
					selected.next().addClass("selected");
				}
			}
		} else if (keyCode === KEY_UP_ARROW) {
			let selected = $(".selected");
			$(".search-result-container li").removeClass("selected");
			if (selected.length === 0) {
				selected = $(".search-result-list-item");
				if (selected.length > 0) {
					$(selected.last()).addClass('selected');
				}
			} else {
				if (selected.prev().length === 0) {
					selected.siblings().last().addClass("selected");
				} else {
					selected.prev().addClass("selected");
				}
			}
		} else if (keyCode === KEY_ENTER) {
			let name = $($(".selected")[0]).text();
			let id = $($(".selected")[0]).attr("id");
			this.setState({
				showItemList: false,
				query: name
			}, () => {
				if (this.props.onClickItem) {
					this.props.onClickItem({
						id:id,
						name:name
					});
				}
			});
		} else if (keyCode === KEY_ESCAPE) {
			this.setState({
				showItemList: false
			});
		}
	}

    render() {
        let { query, itemList, showItemList } = this.state;
		showItemList = this.props.showItemList && showItemList;

        return (
            <div className={`swv-search-bar ${this.props.className}`}>
				<div className={`input-group ${this.props.showIcon? "" : "no-addon"}`}>
					{this.props.showIcon &&
						<span className={`input-group-addon ${this.props.disabled? "disabled" : ""}`}><i className="fa fa-search"/></span>
					}
					<Input
						text={query}
						onChange={this.onChange}
						disabled={this.props.disabled}
						onBlur={ev => this.setState({showItemList: false})}
						placeholder={this.props.placeholder}
						attr={this.props.inputAttr}
						onKeyDown={this.onKeyDown}
					/>
				</div>
                {query && itemList.length > 0 && showItemList &&
					<ul className="search-result-container"
						onMouseDown={ev => ev.preventDefault()}>
						{itemList
							.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
							.map(item =>
								<li
									id={item.id}
									key={item.id}
									className="search-result-list-item"
									onClick={ev => this.onClickItem(ev, item)}>
									<div className="search-result-item">
										{item.imageUrl && <img src={item.imageUrl}/>}
										<div className="name">{item.name}</div>
									</div>
								</li>
							)
						}
					</ul>
                }
            </div>
        );
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	showIcon: PropTypes.bool,
	disabled: PropTypes.bool,
	showItemList: PropTypes.bool,
    itemList:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
    })),
	query: PropTypes.string,
	onClickItem: PropTypes.func,
	inputAttr: PropTypes.object,
};

SearchBar.defaultProps = {
	className: "",
	showIcon: false,
	disabled: false,
	showItemList: true,
	itemList: [],
	query: "",
    onChange: null,
    onClickItem: null,
};