import React from 'react';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import TextUtil from 'Util/TextUtil';
import 'style-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default class Toast {

	static renderReduxToastr() {
		return (
			<ReduxToastr
				timeOut={4000}
				newestOnTop={true}
				position="top-right"
				transitionIn="fadeIn"
				transitionOut="fadeOut"
				progressBar/>
		);
	}

	static success(title, msg) {

		if(TextUtil.isEmpty(msg)) {
			return;
		}

		toastr.success(title, msg);
	}

	static warning(title, msg) {

		if(TextUtil.isEmpty(msg)) {
			return;
		}

		toastr.warning(title, msg);
	}

	static error(title, msg) {

		if(TextUtil.isEmpty(msg)) {
			return;
		}

		toastr.error(title, msg);
	}

	static info(title, msg) {

		if(TextUtil.isEmpty(msg)) {
			return;
		}

		toastr.info(title, msg);
	}
}
