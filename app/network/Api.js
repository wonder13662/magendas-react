import Const from 'Util/Const';

const API_VERSION = "v1";
const API_PREFIX = "/api/" + API_VERSION;

export default {
    SESSION: {url: API_PREFIX + "/session", method: 'GET'},
	LOGOUT: {url: API_PREFIX + "/logout", method: 'GET'}, //query parameter존재. redirect=/#/login
};