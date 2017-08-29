import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import 'style-loader!Component/common/progressbar/steps-style.less';

class Steps extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const stepCount = $(this.progressUl).children().length;
        $(this.progressUl).css('display', 'block');
        $(this.progressUl).find('li').css('width', 100/stepCount+'%');
    }

    render() {

		const className = `swv-steps-progressbar-container ${this.props.className}`;

        return (
            <div className={className} style={this.props.style}>
                <ul className="progressbar" ref={(progressUl) => { this.progressUl = progressUl; }}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

Steps.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
};

Steps.defaultProps = {
	className:"",
	style:{},
};

export default Steps;