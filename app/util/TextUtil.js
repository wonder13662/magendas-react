
export default class TextUtil {

	static includes(text, searchString) {
        if(text.includes){
            return text.includes(searchString);
        }else if(text.contains){ //String.prototype.includes()을 지원안하는 브라우저
            return text.contains(searchString);
        }else {
            return (text.indexOf(searchString) !== -1);
        }
	}

	static format() {
        let theString = arguments[0];
        // start with the second argument (i = 1)
        for (let i = 1; i < arguments.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            let regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }
        return theString;
	}

	static isStr(text) {
		if(	undefined === text ||
			null === text ||
			'string' !== typeof text ) {
			return false;
		}
		return true;
	}

	static isEmpty(text) {
		if(!this.isStr(text)) {
			return true;
		}
        if(	'' === text ||
            '' === text.replace(' ','')) {
            return true;
        }

        return false;
	}

	/*
	 * @ Example : 100000 --> "100,000"
	 * @ Depreacted
	 */
	static getNumberWithComma(number) {
	    if(isNaN(number) || !(-1 < number)) {
	        return "";
        }

        const numberStr = "" + number;

        return numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

	static getUniqueId() {
	    return new Date().getTime() + "_" + parseInt(Math.random(1000000) * 1000000);
    }

    // REMOVE ME
    /*
    static replaceAt(charSequence, index, char) {
        if (!charSequence) return null;

        let charArr = charSequence.split("");
        charArr[index] = char;
        return charArr.join("");
    }
    */
}