import numeral from 'numeral';

export default class NumberUtil {
	static isUnsigned(number) {
		if(isNaN(number)) {
			return false;
		}
		return (0 <= number)?true:false;
	}

	/*
		@ Desc : 정수일 경우, 소수점 2자리를 추가함.
	 */
	static convertNumStr2DecimalPoints(rawNum) {
		const intNum = parseInt(rawNum);
		return `${intNum}.00`;
	}

	/*
		@ Example : 100000 --> "100,000"
	 */
	static getNumberWithComma(number) {
		if(isNaN(number) || !(-1 < number)) {
			return "";
		}

		const numberStr = "" + number;

		return numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	static toOrdinalNumber(num) {
		const s=["th","st","nd","rd"];
		const v=num%100;
		return num+(s[(v-20)%10]||s[v]||s[0]);
	}

	static getMaxNumber() {
		return 400000000000000000000;
	}

	static getDecimalFormat(value = null /* 서버에서 내려온 값 또는 formatted string */) {
		let amount = value || 0;
		if(isNaN(amount)) {
			if(typeof numeral(amount.trim()).value() === 'number'){ //formatted String
				return numeral(amount).format('0,0.00');
			}else { //something else text
				amount = 0;
			}
		}
		return numeral(amount).format('0,0.00');
	}

	static getDecimalFormatDays(value = null /* 서버에서 내려온 값 또는 formatted string */) {
		let amount = value || 0;
		if(isNaN(amount)) {
			if(typeof numeral(amount.trim()).value() === 'number'){ //formatted String
				return numeral(amount).format('0,0.0');
			}else { //something else text
				amount = 0;
			}
		}
		return numeral(amount).format('0,0.0');
	}


	static getDecimal(target, digits) {

		if(isNaN(target)) {
			return null;
		}

		if(!this.isUnsigned(digits)) {
			return null;
		}

		// when if digits is 2, 1000.12323 --> 1000.12

		const base = Math.pow(10, digits);
		return parseInt(target*base)/base;
	}

	static getDecimalValue(formatString) {
		if(!formatString) {
			return 0;
		}else if(typeof formatString === 'number') {
			formatString = ""+formatString;
		}

		const MAX_NUM = NumberUtil.getMaxNumber();

		// "1,000.00" 포맷으로 변경합니다.
		// 1. 숫자, 소수점, '-(minus)'를 제외한 모든 문자를 제거합니다.
		const userInputPure = formatString.replace(/[^0-9\.-]/gi,"");
		// 2. 소수점이 2개 이상이라면 최초의 소수점을 기준으로 나머지를 버립니다.
		const userInputPureSplit = userInputPure.split(".");
		let integer = 0;
		let decimal = 0;
		if(1 < userInputPureSplit.length) {
			integer = Number(`${userInputPureSplit[0]}`);
			if(MAX_NUM < integer) {
				integer = MAX_NUM;
			}
			decimal = Number(`${integer}.${userInputPureSplit[1]}`);
		} else if(1 === userInputPureSplit.length) {
			integer = Number(`${userInputPureSplit[0]}`);
			if(MAX_NUM < integer) {
				integer = MAX_NUM;
			}
			decimal = Number(`${integer}`);
		}

		return decimal;
	}

	// REMOVE ME
	/*
    static addCurrencyBaseRinggit(rawNum) {
        return `RM ${this.getDecimalFormat(rawNum)}`;
    }
    */
}
