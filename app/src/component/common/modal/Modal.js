import React, { Component } from 'react';
import Button from 'Component/common/button/Button';
import LoadingButton from 'Component/common/button/LoadingButton';
import RBModal from 'react-bootstrap/lib/Modal';
import TextUtil from 'Util/TextUtil';
import PropTypes from 'prop-types';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.onHide = this.onHide.bind(this);
    }

	onHide() {
		if(this.props.isLoading) return;
		this.props.onHide();
	}

    render() {
		const attrs = {
			bsSize: this.props.size === 'medium'? null : this.props.size
		};

        return(
            <RBModal
				show={this.props.show}
				onEnter={this.props.onEnter}
				onHide={this.onHide}
				dialogClassName={this.props.className}
				{...attrs}>
                <RBModal.Header closeButton>
                    <RBModal.Title>{this.props.title}</RBModal.Title>
                </RBModal.Header>
                <RBModal.Body>
                    {this.props.children}
                </RBModal.Body>
                <RBModal.Footer>
					{this.props.showBtnClose &&
					<Button
						title={this.props.closeTitle}
						className={"btn btn-default"}
						classNameDim={"btn btn-default btn-default-dim"}
						style={{}}
						disabled={this.props.isLoading}
						onClick={this.onHide}
					/>
					}
                    <LoadingButton
						title={this.props.submitTitle}
                        loadingTitle={this.props.submitLoadingTitle}
                        className={`btn ${this.props.submitClassName} btn-primary-dim`}
                        style={{}}
                        isLoading={this.props.isLoading}
                        onClick={this.props.onClickSubmit}
                    />
                </RBModal.Footer>
            </RBModal>
        );
    }
}

Modal.defaultProps = {
	title: "",
	isLoading: false,
	size: 'medium', // small|medium|large
	className: "",
	closeTitle: "Close",
	submitTitle: "Submit",
	submitLoadingTitle: "Please Wait..",
	submitClassName: "btn-primary",
	onClickSubmit: null,
	showBtnClose:true,
};

Modal.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
    show: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
	onEnter: PropTypes.func,
	onHide: PropTypes.func.isRequired,
	className: PropTypes.string,
	closeTitle: PropTypes.string,
	//submit
	submitTitle: PropTypes.string,
	submitLoadingTitle: PropTypes.string,
	submitClassName: PropTypes.string,
	onClickSubmit: PropTypes.func,
	showBtnClose: PropTypes.bool,
};

export default Modal;