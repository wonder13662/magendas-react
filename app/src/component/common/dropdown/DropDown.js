import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'style-loader!./dropdown.less';

class DropDown extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
		$(this.dropdownToggle).dropdown(); //dom element 렌더링 되었을 때, 드랍다운 초기화
	}

    render() {
        return(
            <div className={`swv-dropdown dropdown ${this.props.className}`} >
                <a href="#" className="dropdown-toggle" ref={toggle => this.dropdownToggle = toggle} data-toggle="dropdown">
					{this.props.title}
					{this.props.showCaret && <span className="caret"/>}
				</a>
                <ul className="dropdown-menu">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

DropDown.defaultProps = {
	title:'No name',
	className: '',
	showCaret: false
};

DropDown.propTypes = {
	title: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
	className: PropTypes.string,
	showCaret: PropTypes.bool
};

export default DropDown;