import _ from 'underscore';

export default class ArrayUtil {
    static includes(array, value) {
        if(array.includes){
            return array.includes(value);
        }else { //Array.prototype.includes()를 지원하지 않는 브라우저
            return (_.indexOf(array, value) > -1);
        }
    }

    static isValid(array) {
    	if(	typeof array === 'undefined' ||
			array === null ||
			array.length === 0 ) {
    		return false;
		}

		return true;
	}

	static isArray(obj) {
		return Array.isArray(obj);
	}
}
