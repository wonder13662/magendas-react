
/*
 * ACTION_TYPE과 ACTION은 묶어서
 */
const UPDATE_SESSION = 'ACCOUNT_SESSION_UPDATE';
export function updateSession(value = {}) {
	return {
		type: UPDATE_SESSION,
		session: value
	};
}

const UPDATE_API_REQUESTED_TIME = 'ACCOUNT_API_REQUESTED_TIME_UPDATE';
export function updateApiRequestedTime() {
	return {
		type: UPDATE_API_REQUESTED_TIME,
		apiRequestedTime: new Date().getTime()
	};
}

/*
 * AppReducer로 노출시킬 reducer
 */
const initState = {
	session: {},
	apiRequestedTime: null
};
export function reducer(state = initState, action) {
	switch (action.type) {
		case UPDATE_SESSION:
			return Object.assign({}, state, {session: action.session});
		case UPDATE_API_REQUESTED_TIME:
			return Object.assign({}, state, {apiRequestedTime: action.apiRequestedTime});
		default:
			return state;
	}
}

