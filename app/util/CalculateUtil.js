import ArrayUtil from 'Util/ArrayUtil';

export default class CalculateUtil {

	/*
		@ Desc : 소수점 2자리 계산시 발생하는 Javascript 자체 숫자포맷 오류를 방어
		@ Referer : https://stackoverflow.com/questions/588004/is-floating-point-math-broken
	 */
	static sumFloat(numberList) {

		if(!ArrayUtil.isValid(numberList) && !(1 < numberList.length)) {
			return null;
		}

		const a = numberList.shift();
		if(isNaN(a)) {
			return null;
		}
		const b = numberList.shift();
		if(isNaN(b)) {
			return null;
		}

		const c = this.addFloat(a,b);
		if(isNaN(c)) {
			return null;
		}

		numberList.unshift(c);
		if(numberList.length === 1) {
			return numberList[0];
		}

		return this.sumFloat(numberList);
	}

	static addFloat(a, b) {

		if(isNaN(a) || isNaN(b)) {
			return null;
		}

		return parseFloat((a + b).toFixed(2));
	}

}
