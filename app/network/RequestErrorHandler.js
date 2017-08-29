import React from 'react';
import ReactDOM from 'react-dom';
import RequestErrorModal from 'Network/RequestErrorModal';

const AppError = {
    '401': {title: "Invalid Parameter", message: null},
    '402': {title: "Unauthorized", message: null},
    '501': {title: "Fail to Make Response", message: null},
    '502': {title: "Fail to Send Email", message: null},
    '601': {title: "Invalid Session", message: null},
    '602': {title: "Fail to Login", message: null},
    '603': {title: "Key Expired", message: null},
    '604': {title: "Fail to Encrypt", message: null},
    '605': {title: "Invalid Password", message: null},
    '606': {title: "Not Verified", message: null},
    '607': {title: "Fail to Generate Key", message: null},
    '608': {title: "Onboarding Login", message: null},
    '701': {title: "Duplicate", message: "Already have same value" + "\n" + "Please input other value"},
    '702': {title: "Invalid TimeZone", message: null},
    '801': {title: "Fail to Upload", message: null},
    '900': {title: "Error", message: "Oops, there is some error in the system. We'll check and fix shortly. Sorry for the inconvenience."},
    '1001': {title: "Fail to Bulk Add", message: null},
    '1002': {title: "Not Found User Id", message: null},
    '1003': {title: "Not Found User Email", message: null},
    '1100': {title: "Fail to Register", message: null},
    '1101': {title: "Invalid Timeoff Balance", message: null},
    '1102': {title: "Fail to Bulk Update", message: null},
    '1201': {title: "Already Invited", message: null},
    '1301': {title: "Fail to Generate Report", message: null},
    '1401': {title: "Force App Update", message: null},
    '1501': {title: "Excessive Request", message: null},
    '1601': {title: "Missing Group Permission", message: null},
    '1701': {title: "Processed Request", message: null},
    '1702': {title: "Cancelled Request", message: null},
    '5000': {title: "Not Found Company", message: null},
	'60001': {title: "Duplicate Name", message: "Requested name is already in use. It must be unique."},
    '100001': {title: "Duplicate Email", message: null},
    '100002': {title: "Invalid Start Date", message: null},
    '100003': {title: "Invalid Department Name", message: null},
    '100004': {title: "Already On Boarding Process User", message: null},
    '100005': {title: "Already On Boarding User", message: null},
    '100006': {title: "Not On Boarding Status", message: null},
    '110001': {title: "Invalid End Date", message: null},
    '110002': {title: "Not Match Two Company Id", message: null},
    '110003': {title: "Last Admin Off Boarding", message: null},
    '110004': {title: "Can't Off Boarding Yourself", message: null},
    '110005': {title: "Already Off Boarding Progress User", message: null},
    '110006': {title: "Already Off Boarding User", message: null},
    '110007': {title: "Not Off Boarding Status", message: null},
    '110008': {title: "Not Off Board Status", message: null}
};

export default class RequestErrorHandler {

    constructor(jqXHR, textStatus, thrownError) {
        this.jqXHR = jqXHR;
        this.textStatus = textStatus;
        this.thrownError = thrownError;

        this.getError = this.getError.bind(this);
        this.getPresenterError = this.getPresenterError.bind(this);
        this.onHideErrorModal = this.onHideErrorModal.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    getError() {
        const jqXHR = this.jqXHR;
        return {
            status: jqXHR.status,
            message: jqXHR.responseJSON? jqXHR.responseJSON.message : jqXHR.statusText,
            code: jqXHR.responseJSON? jqXHR.responseJSON.code : null,
            data: jqXHR.responseJSON? jqXHR.responseJSON.data : null,
        };
    }

    getPresenterError(title, message) {
        return {
            title: title,
            message: message
        };
    }

    onHideErrorModal(ev, presenter) {
        ev.preventDefault();

        ReactDOM.render(
            <RequestErrorModal
                show={false}
                title={presenter.title}
                message={presenter.message}
                onHide={ev => {
                    // console.log(ev);
                }}
            />,
            document.getElementById('modalContainer')
        );
    }

    handleError(isHideErrorModal) {
        const jqXHR = this.jqXHR;
        const textStatus = this.textStatus;
        const thrownError = this.thrownError;
        let presenter = null;
        try{
            if(jqXHR.status === 0) {
                presenter = this.getPresenterError("Offline", "Please check your network.");
            }else if(jqXHR.status === 403) {
                presenter = this.getPresenterError("Sorry! Access denied :(", "You don't have permission toto open this page.");
            }else if(jqXHR.status === 404) {
                presenter = this.getPresenterError(jqXHR.statusText, "Sorry, the page you tried cannot be found");
            }else if(jqXHR.status === 500) {
				if(jqXHR.responseJSON) {
					if (jqXHR.responseJSON.code === 601) {
						// TODO : Redirect to Login Panel when user logged out.
						return;
					}
                    const appError = AppError[''+jqXHR.responseJSON.code];
                    presenter = this.getPresenterError(
                        appError.title,
                        appError.message? appError.message : jqXHR.responseJSON.message
                    );
                    presenter.code = jqXHR.responseJSON.code;
				}else {
                    presenter = this.getPresenterError(jqXHR.statusText, "Something went wrong. We will check this error shortly.");
                }
            }else if(textStatus === 'parsererror') {
                presenter = this.getPresenterError("Parse Error", "Requested JSON parse failed.");
            }else if(textStatus === 'timeout') {
                presenter = this.getPresenterError("Timeout", "There was a problem with your request. Please try again.");
            }else {
				presenter = this.getPresenterError(jqXHR.statusText, thrownError || jqXHR.statusText || "");
            }
        }catch(error) {
            presenter = this.getPresenterError("Error", "Oops, there is some error in the system. We'll check and fix shortly. Sorry for the inconvenience.");
        }

        jqXHR.appError = presenter;

        if(!isHideErrorModal) {
            ReactDOM.render(
                <RequestErrorModal
                    show={true}
                    title={presenter.title}
                    message={presenter.message}
                    onHide={ev => this.onHideErrorModal(ev, presenter)}
					buttonName="Okay"
                />,
                document.getElementById('modalContainer')
            );
        }
    }
}