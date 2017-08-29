import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export default class RequestErrorModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<Modal show={this.props.show}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    {this.props.message}
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-primary" type="button" onClick={this.props.onHide}>{this.props.buttonName}</button>
				</Modal.Footer>
			</Modal>
        );
    }
}

RequestErrorModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    buttonName: PropTypes.string
};

RequestErrorModal.defaultProps = {
    title: "Error",
    message: "Unexpected error occurred",
    buttonName: "Close"
};