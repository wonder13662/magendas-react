import { combineReducers } from 'redux';
import { reducer as account } from './action/account';
import { reducer as toastrReducer } from 'react-redux-toastr';

const AppReducer = combineReducers({
	account,
	toastr: toastrReducer,
});

export default AppReducer;