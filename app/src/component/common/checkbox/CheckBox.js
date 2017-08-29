import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextUtil from 'Util/TextUtil';
import $ from 'jquery';

import 'style-loader!Component/common/checkbox/checkbox.less';

const CLASSNAME_LABEL = "glyphicon glyphicon-ok";
const CLASSNAME_FIELD = "swv-checkbox-field";

class CheckBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uniqueId:TextUtil.getUniqueId(),
            classNameLabelNext:CLASSNAME_LABEL,
            classNameFieldNext:CLASSNAME_FIELD,
            checked:props.checked,
        };

        this.onClickField = this.onClickField.bind(this);
        this.onClickCheckBox = this.onClickCheckBox.bind(this);
        this.onChange = this.onChange.bind(this);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.isChecked = this.isChecked.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.dispatchUpdate = this.dispatchUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checked:nextProps.checked });
    }

    isChecked() {
        return this.props.checked;
    }

    toggleCheckBox() {
    	if(this.props.disabled) return;

		const checked = !this.props.checked;
        this.setState({ checked }, () => {
        	// 내부적으로 토글된 뒤에, 변경된 값을 전달.
            this.dispatchUpdate(checked);
        });
    }

    dispatchUpdate(checked) {
        const metaData = this.props.metaData;
        if(this.props.onChange) {
            this.props.onChange({ checked, metaData });
        }
    }

    onChange() {
        // Do nothing...
    }

    onClickField(event) {
    	event.stopPropagation();
		// 다른 노드에게 이벤트 전파를 막음.
		// 공식문서에는 이벤트를 전파하고 해당 노드에만 이벤트를 취소한다고 하지만 리액트상에서는 다르게 동작
		// https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
		event.preventDefault();
        this.toggleCheckBox();
    }

    onClickCheckBox(event) {
		event.stopPropagation();
		event.preventDefault();
        this.toggleCheckBox();

        if(this.props.onClick) {
			this.props.onClick(event);
		}
    }

    onMouseEnter(event) {
        const classNameLabelNext = (this.isChecked())?CLASSNAME_LABEL:CLASSNAME_LABEL + " swv-checkbox on-mouse-over-label";
        this.setState({classNameLabelNext:classNameLabelNext});
    }

    onMouseLeave(event) {
        this.setState({classNameLabelNext:CLASSNAME_LABEL});
    }

    render() {
		const classNameFieldNext = `swv-ellipsis ${this.state.classNameFieldNext}`;
		let inputAttr = {};
    	if(this.props.disabled) {
    		Object.assign(inputAttr, {disabled:"disabled"});
		}

        return (
            <div className={`swv-checkbox ${this.props.className} ${this.props.disabled? "disabled" : ""}`} style={this.props.style}>
                <input
                    type="checkbox"
                    className="input-c"
                    name={this.state.uniqueId}
                    checked={this.state.checked}
                    onChange={this.onChange}
                    ref={this.props.inputRef}
					{...inputAttr}
                    id={this.state.uniqueId}/>
                <label
                    htmlFor={this.state.uniqueId}
                    onClick={this.onClickCheckBox}
                >
                    <span
                        className={this.state.classNameLabelNext}>
                    </span>
                </label>
                <div
                    className={classNameFieldNext}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClickField}
                >{this.props.title}</div>
            </div>
        );
    }

}

CheckBox.defaultProps = {
    title: "",
	style: {},
    metaData: {},
    onChange: null,
    checked: false,
	className: "",
	disabled: false,
	onClick: null,
};

CheckBox.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	title: PropTypes.string,
    metaData: PropTypes.object,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default CheckBox;