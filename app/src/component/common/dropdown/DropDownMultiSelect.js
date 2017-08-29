import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'underscore';
import PropTypes from 'prop-types';
import CheckBox from 'Component/common/checkbox/CheckBox';
import TextUtil from 'Util/TextUtil';
import JqueryUtil from 'Util/JqueryUtil';
import ArrayUtil from 'Util/ArrayUtil';
import Const from 'Util/Const';
import Util from 'Util/Util';
import SearchTextFilter from 'Component/common/filter/SearchTextFilter';

import 'style-loader!Component/common/dropdown/dropdown-multi-select.less';

const LIST_MULTI_SELECT = Const.LIST_MULTI_SELECT;
const DROPDOWN_BUTTON_TYPE = Const.DROPDOWN_BUTTON_TYPE;

class DropDownMultiSelect extends Component {

    constructor(props) {
        super(props);

        // checked 속성이 없다면 기본값 설정.
		let options = [];
		let optGroups = [];
		if(ArrayUtil.isValid(props.options)) {

			options = this.setOptionsChecked(props.options);

		} else if(ArrayUtil.isValid(props.optGroups)) {

			optGroups = this.mapOptGroupsOptions(props.optGroups, (options) => {
				return this.setOptionsChecked(options);
			});

		}

        this.state = {
            uniqueId:TextUtil.getUniqueId(),
			buttonWidth:props.buttonWidth,
            options:Util.deepCopy(options),					// 아이템 리스트. 검색 결과에 상관없이 외부로 부터 받은 모든 아이템이 보여짐.
			optionsOnView:Util.deepCopy(options),			// 아이템 리스트. 검색 결과에 따라 다른 결과가 보여짐.
			optGroups:Util.deepCopy(optGroups),				// 그룹 아이템 리스트. 검색 결과에 상관없이 외부로 부터 받은 모든 아이템이 보여짐.
			optGroupsOnView:Util.deepCopy(optGroups),		// 그룹 아이템 리스트. 검색 결과에 따라 다른 결과가 보여짐.
            isResetSearchText:false,
            buttonType:props.buttonType,
            listStyle:{},
            collisionWatcher:null,
            isCheckedSelectAll:false,
			userInput:"",
			classNameCheckBox:"swv-multi-select-checkbox",
			boxStyle:{padding:"0px 5px 0px 20px"},
        };

        this.onChange = this.onChange.bind(this);
        this.doFilter = this.doFilter.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.onClickBtnShowList = this.onClickBtnShowList.bind(this);
        this.clearSearchText = this.clearSearchText.bind(this);
        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
        this.setFixedList = this.setFixedList.bind(this);

        this.onClickBody = this.onClickBody.bind(this);

        this.drawOption = this.drawOption.bind(this);
        this.drawOptGroups = this.drawOptGroups.bind(this);
        this.onClickOptGroupTitle = this.onClickOptGroupTitle.bind(this);
        this.wrapLIListWithUL = this.wrapLIListWithUL.bind(this);

        this.setOptionsChecked = this.setOptionsChecked.bind(this);
        this.toggleCheckBoxInOptions = this.toggleCheckBoxInOptions.bind(this);
        this.toggleAllCheckboxInOptions = this.toggleAllCheckboxInOptions.bind(this);
        this.mapOptGroupsOptions = this.mapOptGroupsOptions.bind(this);

		this.addSelectAllNothing = this.addSelectAllNothing.bind(this);
		this.getStyleSearchTextFilter = this.getStyleSearchTextFilter.bind(this);

		this.toggleAllCheckboxInOptGroups = this.toggleAllCheckboxInOptGroups.bind(this);
		this.toggleAllCheckboxInOptGroup = this.toggleAllCheckboxInOptGroup.bind(this);

		this.afterOnChangeCheckbox = this.afterOnChangeCheckbox.bind(this);
    }

	componentWillReceiveProps(nextProp) {

		let isCheckedSelectAll = true;

    	if(nextProp.options) {

			const itemUnchecked = _.find(nextProp.options, item => {
				return !item.checked;
			});
			isCheckedSelectAll = (itemUnchecked)?false:true;

			this.setState({
				isCheckedSelectAll,
				options:Util.deepCopy(nextProp.options),
				optionsOnView:Util.deepCopy(nextProp.options),
			});
		}else if(nextProp.optGroups){

			const itemUnchecked =
				_.find(nextProp.optGroups, item => {
				const itemUnchecked = _.find(item.options, _item => {
					return !_item.checked;
				});
				return (itemUnchecked)?true:false;
			});
			isCheckedSelectAll = (itemUnchecked)?false:true;

			this.setState({
				isCheckedSelectAll,
				optGroups:Util.deepCopy(nextProp.optGroups),
				optGroupsOnView:Util.deepCopy(nextProp.optGroups),
			});
		}
	}

    /*
    	@ Desc : Group Item의 Item list를 조회, 처리.
     */
    mapOptGroupsOptions(optGroups, callback) {

		if(!ArrayUtil.isValid(optGroups)) {
			return [];
		}
		if(!_.isFunction(callback)) {
			return;
		}

		const optGroupsClone = Util.deepCopy(optGroups);

		const optGroupsNext =
			optGroupsClone.map((optGroup, index) => {

				if(!optGroup) {
					return null;
				}
				if(!ArrayUtil.isValid(optGroup.options)) {
					return null;
				}

				const options = callback(optGroup.options);
				const optGroupNext = Object.assign(optGroup, { options });

				return optGroupNext;
			});

		return optGroupsNext;
	}

	setOptionsChecked(options, isChecked) {
		if(!ArrayUtil.isValid(options)) {
			return [];
		}

		return options.map((option, index) => {
			if(undefined === option.checked || null === option.checked) {
				option.checked = false;
			}
			return option;
		});
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

		if(ArrayUtil.isValid(this.state.options)) {
			// 1. 단일 아이템 리스트
			if(TextUtil.isEmpty(keyword)) {
				// 검색어가 없는 경우는 모두를 보여줍니다.
				this.setState({
					userInput:keyword,
					optionsOnView:this.state.options,
				});
				return;
			}

			// 검색어가 유효한 경우. 검색을 진행.
			const optionsClone = Util.deepCopy(this.state.options);
			const optionsFiltered =
				_.filter(optionsClone, (option) => {

					if(option && option.title) {
						return (-1 < option.title.toLowerCase().indexOf(keyword.toLowerCase()));
					}

					return false;
				});

			this.setState({
				userInput:keyword,
				optionsOnView:optionsFiltered,
			});

		} else if(ArrayUtil.isValid(this.state.optGroups)) {
			// 2. 그룹 아이템 리스트
			const optGroupsClone = Util.deepCopy(this.state.optGroups);

			if(TextUtil.isEmpty(keyword)) {
				// 검색어가 없는 경우는 모두를 보여줍니다.
				this.setState({
					optGroupsOnView:optGroupsClone,
					userInput:keyword,
				});
				return;
			}

			const optGroupsFiltered =
				this.mapOptGroupsOptions(optGroupsClone, (options) => {
					const optionsFiltered =
						_.filter(options, (option) => {
							if(option && option.title) {
								return (-1 < option.title.toLowerCase().indexOf(keyword.toLowerCase()));
							}

							return false;
						});

					return optionsFiltered;
				});

			this.setState({
				optGroupsOnView:optGroupsFiltered,
			 	userInput:keyword,
			});
		}
	}

    onClickOption(event) {
        event.stopPropagation();
    }

	onClickOptGroupTitle(event) {
		event.stopPropagation();

		// 선택한 그룹의 option들을 토글한다.
		const groupName = $(event.target).html();
		const optGroupsOnViewClone = Util.deepCopy(this.state.optGroupsOnView);

		const optGroupOnView = _.findWhere(optGroupsOnViewClone, { title:groupName });
		if(!optGroupOnView) {
			return;
		}
		const optionsOnView = optGroupOnView.options;
		if(!ArrayUtil.isValid(optionsOnView)) {
			return;
		}

		const optionUnchecked = _.findWhere(optionsOnView, { checked:false });
		let isAllChecked = (optionUnchecked)?false:true;

		// 그룹 안의 option이 모두 선택되어 있을 때만, 선택 취소를 합니다.
		const isChecked = (isAllChecked)?false:true;
		const optGroupsOnViewNext =
			this.mapOptGroupsOptions(this.state.optGroupsOnView, (options) => {
				const optionsNext = this.toggleAllCheckboxInOptGroup(options, optionsOnView, isChecked);
				return optionsNext;
			});
		const optGroupsNext =
			this.mapOptGroupsOptions(this.state.optGroups, (options) => {
				const optionsNext = this.toggleAllCheckboxInOptGroup(options, optionsOnView, isChecked);
				return optionsNext;
			});

		this.setState({ optGroups:optGroupsNext, optGroupsOnView:optGroupsOnViewNext }, () => {
			this.afterOnChangeCheckbox();
		});
	}

    onClickBtnShowList(event) {
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
            // 사용자의 클릭으로 DropDown이 닫히지 않도록 강제합니다.
            // ex) 여러개의 checkbox를 선택해야 하는 경우
            this.setState({listStyle:{display:"block"}});
        } else {
            this.setState({listStyle:{display:"none"}});
        }
    }

    onChangeCheckBox({ checked, metaData }) {

    	// TODO : 추가적인 조건 사항을 반영
		// 1. 검색 결과가 없는데, SelectAll을 누르는 경우. -> 검색 결과가 없다면, SelectAll 버튼도 노출되지 않아야 한다.

		if(ArrayUtil.isValid(this.state.options)) {
			// 1. options
			if(LIST_MULTI_SELECT.ID_SELECT_ALL === metaData.value) {

				const isCheckedSelectAll = !this.state.isCheckedSelectAll;

				const optionsNext = this.toggleAllCheckboxInOptions(this.state.options, this.state.optionsOnView, isCheckedSelectAll);
				const optionsOnViewNext = this.toggleAllCheckboxInOptions(this.state.optionsOnView, this.state.optionsOnView, isCheckedSelectAll);
				this.setState({ options:optionsNext, optionsOnView:optionsOnViewNext, isCheckedSelectAll:isCheckedSelectAll }, () => {
					this.afterOnChangeCheckbox();
				});

			} else {

				const optionsNext = this.toggleCheckBoxInOptions(this.state.options, metaData.value, checked);
				const optionsOnViewNext = this.toggleCheckBoxInOptions(this.state.optionsOnView, metaData.value, checked);

				// 뷰에 보이는 체크박스가 모두 체크되었는지 검사.
				const optionsOnViewNextOnlyChecked = _.filter(optionsOnViewNext, (option) => {
					return option.checked;
				});
				const isCheckedSelectAll = (0 < optionsOnViewNext.length && optionsOnViewNextOnlyChecked.length === optionsOnViewNext.length)?true:false;

				this.setState({ options:optionsNext, optionsOnView:optionsOnViewNext, isCheckedSelectAll }, () => {
					this.afterOnChangeCheckbox();
				});
			}
		} else if(ArrayUtil.isValid(this.state.optGroups)) {
			// 2. optGroups
			if(LIST_MULTI_SELECT.ID_SELECT_ALL === metaData.value) {

				const isCheckedSelectAll = !this.state.isCheckedSelectAll;

				const optGroupsOnViewNext =
					this.mapOptGroupsOptions(this.state.optGroupsOnView, (options) => {
						const optionsNext = this.toggleAllCheckboxInOptGroups(options, this.state.optGroupsOnView, isCheckedSelectAll);
						return optionsNext;
					});
				const optGroupsNext =
					this.mapOptGroupsOptions(this.state.optGroups, (options) => {
						const optionsNext = this.toggleAllCheckboxInOptGroups(options, this.state.optGroupsOnView, isCheckedSelectAll);
						return optionsNext;
					});

				this.setState({ optGroups:optGroupsNext, optGroupsOnView:optGroupsOnViewNext, isCheckedSelectAll:isCheckedSelectAll }, () => {
					this.afterOnChangeCheckbox();
				});

			} else {
				const optGroupsOnViewNext =
					this.mapOptGroupsOptions(this.state.optGroupsOnView, (options) => {
						const optionsNext = this.toggleCheckBoxInOptions(options, metaData.value, checked);
						return optionsNext;
					});
				const optGroupsNext =
					this.mapOptGroupsOptions(this.state.optGroups, (options) => {
						const optionsNext = this.toggleCheckBoxInOptions(options, metaData.value, checked);
						return optionsNext;
					});

				// 뷰에 보이는 체크박스가 모두 체크되었는지 검사.
				let optGroupsOnViewNextFlatten = [];
				_.each(optGroupsOnViewNext, ( element ) => {
					optGroupsOnViewNextFlatten = optGroupsOnViewNextFlatten.concat(element.options);
				});
				const optGroupsOnViewNextFlattenChecked =
				_.filter(optGroupsOnViewNextFlatten, (item) => {
					return item.checked;
				});
				const isCheckedSelectAll = (ArrayUtil.isValid(optGroupsOnViewNextFlatten) && optGroupsOnViewNextFlatten.length === optGroupsOnViewNextFlattenChecked.length)?true:false;

				this.setState({ optGroups:optGroupsNext, optGroupsOnView:optGroupsOnViewNext, isCheckedSelectAll:isCheckedSelectAll }, () => {
					this.afterOnChangeCheckbox();
				});
			}
		}
    }

    afterOnChangeCheckbox() {
    	if(this.props.onChange) {
			this.props.onChange({ optGroups:this.state.optGroups, options:this.state.options });
		}
	}

    toggleAllCheckboxInOptions(options, optionsOnView, checked) {

		if(!ArrayUtil.isValid(options)) {
			return options;
		}
		if(!ArrayUtil.isValid(optionsOnView)) {
			return options;
		}

		const optionsClone = Util.deepCopy(options);
		const optionsNext = optionsClone.map((option) => {
			// View에 노출된 option만 변경해야 합니다.
			const optionOnView = _.findWhere(optionsOnView, option);
			if(optionOnView) {
				option.checked = checked;
			}
			return option;
		});

		return optionsNext;
	}

	toggleAllCheckboxInOptGroups(options, optGroups, checked) {

		if(!ArrayUtil.isValid(options)) {
			return options;
		}
		if(!ArrayUtil.isValid(optGroups)) {
			return options;
		}

		const optionsClone = Util.deepCopy(options);
		const optionsNext = optionsClone.map((option) => {
			// View에 노출된 option만 변경해야 합니다.

			for(let optionsOnView of optGroups) {

				if(!optionsOnView) {
					continue;
				}

				const optionOnView = _.findWhere(optionsOnView.options, option);
				if(!ArrayUtil.isValid(optionsOnView.options)) {
					continue;
				}

				if(optionOnView) {
					option.checked = checked;
					break;
				}
			}

			return option;
		});

		return optionsNext;
	}

	toggleAllCheckboxInOptGroup(options, optionsOnView, checked) {

		if(!ArrayUtil.isValid(options)) {
			return options;
		}
		if(!ArrayUtil.isValid(optionsOnView)) {
			return options;
		}

		const optionsClone = Util.deepCopy(options);
		const optionsNext = optionsClone.map((option) => {
			// View에 노출된 option만 변경해야 합니다.
			if(!ArrayUtil.isValid(optionsOnView)) {
				return option;
			}

			const optionOnView = _.findWhere(optionsOnView, option);
			if(optionOnView) {
				option.checked = checked;
			}

			return option;
		});

		return optionsNext;
	}

    toggleCheckBoxInOptions(options, id, checked) {

    	if(!ArrayUtil.isValid(options)) {
    		return [];
		}

		const optionsNext = options.map((option, index) => {
			if(option.value === id) {
				option.checked = checked;
			}
			return option;
		});

		return optionsNext;
	}

    clearSearchText() {
        this.setState({isResetSearchText:true},() => {
            this.setState({isResetSearchText:false});
        });
    }

	wrapLIListWithUL(liList) {
    	if(!liList || 0 === liList.length) {
    		return;
		}

		return (
			<ul
				className="dropdown-menu no-bullet dropdown-filter"
				style={this.state.listStyle}
				aria-labelledby={this.state.uniqueId}
				ref={(dropDownList) => { this.dropDownList = dropDownList; }}
				aria-expanded="true">
				{liList}
			</ul>
		);
	}

	getStyleSearchTextFilter() {
		return {
			border:"0px",
			boxShadow:"none",
		};
	}

	drawOption(option, key) {

		if(TextUtil.isEmpty(key)) {
			key = TextUtil.getUniqueId();
		}

		let node;
		// ID_ITEM_GROUP
		if(LIST_MULTI_SELECT.ID_ITEM_GROUP === option.value) {
			node = (
				<li key={key}>
					<a
						onClick={this.onClickOptGroupTitle}
						className={this.state.classNameCheckBox}>
						{option.title}
					</a>
				</li>
			);
		} else if(LIST_MULTI_SELECT.ID_SEPERATOR === option.value) {
			node = (
				<li key={key} role="separator" className="swv-divider divider"></li>
			);

		} else if(LIST_MULTI_SELECT.ID_SELECT_ALL === option.value) {

			node = (
				<li
					key={key}
					id={option.value}>
					<a
						id={option.value}
						onClick={this.onClickOption}
						className={this.state.classNameCheckBox}>
						<CheckBox
							title={option.title}
							metaData={option}
							onChange={this.onChangeCheckBox}
							checked={this.state.isCheckedSelectAll}
						/>
					</a>
				</li>
			);

		} else if(LIST_MULTI_SELECT.ID_NO_RESULT === option.value) {
			node = (
				<li key={key} className="no-result">{option.title}</li>
			);

		} else {
			node = (
				<li
					key={key}
					id={option.value}>
					<a
						id={option.value}
						onClick={this.onClickOption}
						className={this.state.classNameCheckBox}>
						<CheckBox
							title={option.title}
							metaData={option}
							onChange={this.onChangeCheckBox}
							checked={(option.checked && true === option.checked)?true:false}
						/>
					</a>
				</li>
			);
		}

		return node;
	}

	addSelectAllNothing(listItem) {

		if(!ArrayUtil.isValid(listItem)) {
			listItem = [];
		}

		// Seperator
		// Deselect All
		// Select All
		listItem.unshift(
			{
				value:LIST_MULTI_SELECT.ID_SELECT_ALL,
				title:LIST_MULTI_SELECT.NAME_SELECT_ALL,
				checked:false,
			},
			{
				value:LIST_MULTI_SELECT.ID_SEPERATOR,
				title:LIST_MULTI_SELECT.NAME_SEPERATOR,
				checked:false,
			}
		);

		return listItem;
	}

	addNoResult(listItem) {

		if(!ArrayUtil.isValid(listItem)) {
			listItem = [];
		}

		// No result
		listItem.unshift(
			{
				value:LIST_MULTI_SELECT.ID_NO_RESULT,
				title:LIST_MULTI_SELECT.NAME_NO_RESULT,
				checked:false,
			}
		);

		return listItem;
	}


    drawOptionList() {

		if(!this.state.options || (0 === this.state.options.length)) {
			return;
		}

        // 리스트 복사.
        let optionsOnViewClone = Util.deepCopy(this.state.optionsOnView);
		if(ArrayUtil.isValid(optionsOnViewClone)) {
			// 화면에 표시할 option이 있는 경우
			optionsOnViewClone = this.addSelectAllNothing(optionsOnViewClone);
		} else if(!TextUtil.isEmpty(this.state.userInput)) {
			// 화면에 표시할 option이 없고, 검색어가 있는 경우. 검색어에 매칭되는 결과가 없음.
			optionsOnViewClone = this.addNoResult(optionsOnViewClone);
		}

		// 1. optionsOnView가 없다면 SelectAll을 제외.
		// 2. optionsOnView가 없고, 검색 키워드가 없다면, "No Result" 메시지 노출.
		// Select All / Unselect All
		let selectAllNothingElList = [];
		for(let option of optionsOnViewClone) {
			const optionNext = this.drawOption(option);
			if(null !== optionNext) {
				selectAllNothingElList.push(optionNext);
			}
		}

		// TODO : 검색어가 있고 검색 결과가 없다면, Select All도 제외한다. "No Result" 메시지 노출.

		return selectAllNothingElList;
    }

	drawOptGroups() {

		if(!this.state.optGroups || (0 === this.state.optGroups.length)) {
			return;
		}

		// 리스트 복사.
		let optGroupsClone = Util.deepCopy(this.state.optGroupsOnView);
		let optGroupElList = [];

		// 그룹별로 노출할 아이템이 있는지 확인
		const hasShowingItem = ArrayUtil.isValid(_.filter(optGroupsClone, (optGroup) => {
			return ArrayUtil.isValid(optGroup.options);
		}));

		if(hasShowingItem) {
			// 그룹별로 리스트를 나누어 그립니다.

			for(let i = 0; i < optGroupsClone.length; i++) {

				const optGroup = optGroupsClone[i];
				const key = i * 10000;

				if(!optGroup) {
					continue;
				}

				// 그룹 이름 아이템을 그립니다.
				const groupNameEl = this.drawOption({
					title:optGroup.title,
					value:LIST_MULTI_SELECT.ID_ITEM_GROUP,
				}, key);

				// 아이템 리스트를 그립니다.
				const options = optGroup.options;
				let optionElList = options.map((option, idx) => {
					const keyForOption = (key + idx + 1);
					const output = this.drawOption(option, keyForOption);
					return output;
				});

				if(ArrayUtil.isValid(options)) {
					// option이 화면에 나타날때만 그룹 이름을 표시합니다.
					// 그룹 이름 아이템을 가장 앞에 배치
					optionElList.unshift(groupNameEl);
				}
				optGroupElList = optGroupElList.concat(optionElList);
			}

			// 화면에 표시할 option이 있는 경우
			// 전체 선택/해제 추가
			const selectAllNothing = this.addSelectAllNothing([]);
			let selectAllNothingElList = [];
			for(let option of selectAllNothing) {
				const optionNext = this.drawOption(option);
				if(null !== optionNext) {
					selectAllNothingElList.push(optionNext);
				}
			}
			optGroupElList = selectAllNothingElList.concat(optGroupElList);
		} else if(!TextUtil.isEmpty(this.state.userInput)) {
			// 검색어가 있고 검색 결과가 없다면, Select All도 제외한다. "No Result" 메시지 노출.
			// 화면에 표시할 option이 없고, 검색어가 있는 경우. 검색어에 매칭되는 결과가 없음.
			optGroupElList.push(
				this.drawOption({
					title:LIST_MULTI_SELECT.NAME_NO_RESULT,
					value:LIST_MULTI_SELECT.ID_NO_RESULT,
				})
			);
		}

		return optGroupElList;
	}

    drawButton() {

    	let buttonNode;
		let buttonNodeTitle;
        const attr = (this.props.disabled)?{disabled:"disabled"}:{};
		const styleButton = (0 < this.props.buttonWidth)?{width:`${this.props.buttonWidth}px`}:{width:'100%'};

		//create buttonNodeTitle
		if(ArrayUtil.isValid(this.state.options)){
			let checkedOptCount = _.filter(this.state.options, option => option.checked).length;

			// set msg
			if(this.props.onChangeMsg) {
				buttonNodeTitle = this.props.onChangeMsg({ checkedOptCount });
			} else {
				buttonNodeTitle = checkedOptCount? `${checkedOptCount} ${this.props.itemSelectedTitle}` : this.props.buttonPlaceholder;
			}

		} else if(ArrayUtil.isValid(this.state.optGroups)) {
			let checkedOptCount = 0;
			for(let optGroup of this.state.optGroups) {
				checkedOptCount += _.filter(optGroup.options, option => option.checked).length;
			}

			// set msg
			if(this.props.onChangeMsg) {
				buttonNodeTitle = this.props.onChangeMsg({ checkedOptCount });
			} else {
				buttonNodeTitle = checkedOptCount? `${checkedOptCount} ${this.props.itemSelectedTitle}` : this.props.buttonPlaceholder;
			}

		} else {
			buttonNodeTitle = this.props.buttonPlaceholder;
		}

        if(DROPDOWN_BUTTON_TYPE.ANCHOR === this.props.buttonType) {

            // anchor
            buttonNode = (
                <a
                    href="#"
                    className="dropdown-toggle"
					style={styleButton}
                    data-toggle="dropdown"
                    ref={(button) => { this.button = button; }}
                    onClick={this.onClickBtnShowList}>
                    {buttonNodeTitle}
					<span className="caret"/>
                </a>
            );

        } else if(DROPDOWN_BUTTON_TYPE.BUTTON === this.state.buttonType) {

            // button
            buttonNode = (
                <button
                    id={this.state.uniqueId}
                    className="btn btn-default dropdown-toggle"
					style={styleButton}
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    ref={(button) => { this.button = button; }}
                    onClick={this.onClickBtnShowList}
					{...attr}>
                    {buttonNodeTitle}
					<span className="caret"/>
                </button>
            );

        }

        return (buttonNode);
    }

    render() {

    	// userInput 검색 키워드가 있고, optionsFiltered -> 검색 결과가 없다면 SelectAll 버튼을 그리지 않습니다.
    	let options = null;
    	if(this.state.optGroups && (0 < this.state.optGroups.length)) {
    		// 그룹 아이템 리스트를 그립니다.
			options = this.drawOptGroups();
		} else if(this.state.options && (0 < this.state.options.length)) {
			// 아이템 리스트를 그립니다.
			options = this.drawOptionList();
		}

		const className = `dropdown user-dropdown swv-dropdown-multi-select ${this.props.className}`;
    	// const styleDropDownMenu = (0 < this.props.width)?Object.assign({width:`${this.props.width}px`}, this.state.listStyle):this.state.listStyle;
		const styleDropDownMenu = this.state.listStyle;

        return(
            <span className={className}>
				{this.drawButton()}
				<ul
					className="dropdown-menu no-bullet dropdown-filter"
					style={styleDropDownMenu}
					aria-labelledby={this.state.uniqueId}
					ref={(dropDownList) => { this.dropDownList = dropDownList; }}
					aria-expanded="true">
					<li
						key={'search_bar'}
						id={'search_bar'}
						className={this.state.classNameCheckBox}>
						<SearchTextFilter
							text={this.state.userInput}
							message={""}
							placeholder={this.props.placeHolderSearchBar}
							style={this.getStyleSearchTextFilter()}
							boxStyle={this.state.boxStyle}
							onChange={this.onChange}
							isReset={this.state.isResetSearchText}
							searchIcon
						/>
					</li>
					<li key={'separator_search_bar'} role="separator" className="swv-divider divider"></li>
					{options}
				</ul>
            </span>
        );
    }
}

DropDownMultiSelect.defaultProps = {
	className: "",
	disabled: false,
	buttonPlaceholder: "Choose From Options",
	placeHolderSearchBar: "Search anything",
	buttonWidth: -1,
	onChangeMsg: null,
	itemSelectedTitle: "items selected"
};

DropDownMultiSelect.propTypes = {
	buttonType: PropTypes.string,
	buttonWidth: PropTypes.number,
	buttonPlaceholder: PropTypes.string,
    options:PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
		checked: PropTypes.bool.isRequired,
    })),
	optGroups:PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			options: PropTypes.arrayOf(
				PropTypes.shape({
					value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
					title: PropTypes.string.isRequired,
					checked: PropTypes.bool.isRequired,
				})
			)
		})
	),
    listStyle: PropTypes.object,
	placeHolderSearchBar: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onChangeMsg: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	itemSelectedTitle: PropTypes.string
};

export default DropDownMultiSelect;