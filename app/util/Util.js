import _ from 'underscore';

let stopWatchTime;
export default class Util {

    static isDevelopmentEnv() {
        return process.env.NODE_ENV === 'development';
    }

    // @ Deprecated : please use immutable.js instead.
    static deepCopy(obj) {

    	if(_.isArray(obj)) {

			const cloneArray = [];
			for(let element of obj) {
				cloneArray.push(JSON.parse(JSON.stringify(element)));
			}

    		return cloneArray;
		}

        return JSON.parse(JSON.stringify(obj));
    }

    static whichBrowser() { //http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        let isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Firefox 1.0+
        let isFirefox = typeof InstallTrigger !== 'undefined';
        // Safari 3.0+
        let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
        // Internet Explorer 6-11
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
        let isEdge = !isIE && !!window.StyleMedia;
        // Chrome 1+
        let isChrome = !!window.chrome && !!window.chrome.webstore;

        if(isOpera) {
            return "opera";
        }else if(isFirefox) {
            return "firefox";
        }else if(isSafari) {
            return "safari";
        }else if(isIE) {
            return "ie";
        }else if(isEdge) {
            return "edge";
        }else if(isChrome) {
            return "chrome";
        }else {
            return "other";
        }
    }

	static stopWatchLap (forceToReset) {
		if(!stopWatchTime || forceToReset) {
			stopWatchTime = new Date().getTime();
		}

		const stopWatchTimeNow = new Date().getTime();
		const diff = stopWatchTimeNow - stopWatchTime;

		stopWatchTime = stopWatchTimeNow;

		return diff;
	}

}