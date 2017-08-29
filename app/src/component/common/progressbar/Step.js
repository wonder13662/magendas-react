import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from 'Util/Const';

const STEP_STATUS = Const.STEP_STATUS;

class Step extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={this.props.status}>{this.props.title}</li>
        );
    }
}

Step.propTypes = {
    status: PropTypes.oneOf([STEP_STATUS.FINISH, STEP_STATUS.ONGOING, STEP_STATUS.WAIT]).isRequired,
    title: PropTypes.string.isRequired
};

Step.defaultProps = {
    status:STEP_STATUS.WAIT,
	title: ""
};

export default Step;