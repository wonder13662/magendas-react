import moment from 'moment-timezone';
import i18next from 'i18next';
import TextUtil from 'Util/TextUtil';
import DataCache from 'Network/DataCache';
import RequestErrorHandler from 'Network/RequestErrorHandler';
import { updateApiRequestedTime } from 'Action/account';
import Promise from 'promise';

let dataCache = new DataCache();
let reduxStore = null;

class DataProvider {

    constructor(api, arg1, arg2, arg3) {
        if (!api) return;

        let apiObj = {};
        if (arg1 && api.method === 'GET') {
            let url = api.url;
            let lastChar = url.substring(url.length - 1, url.length);
            let hasFormatString = TextUtil.includes(url,'{0}');
            if (lastChar !== "/" && !hasFormatString) {
                apiObj.url = TextUtil.format(api.url + "/{0}", arg1, arg2, arg3);
            }
        }

        if(!apiObj.url){
            apiObj.url = TextUtil.format(api.url, arg1, arg2, arg3);
        }
        apiObj.method = api.method;

        //variables
        this.apiObj = apiObj;
        this.shouldUseCache = false;
        this.jsonData = null;
        this.formData = null;
        this.shouldSync = false;
        this.xhr = null;
        this.isHideErrorModal = false;

        //methods
        this.setJsonData = this.setJsonData.bind(this);
        this.addQuery = this.addQuery.bind(this);
        this.addFile = this.addFile.bind(this);
        this.toSync = this.toSync.bind(this);
        this.useCache = this.useCache.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.request = this.request.bind(this);
        this.requestMock = this.requestMock.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    setJsonData(json) {
        if(typeof json === 'object') {
            json = JSON.stringify(json);
        }
        this.jsonData = json;
        return this;
    }

    addQuery(key, value) {
        let url = this.apiObj.url;
        if (TextUtil.includes(url, "?")) {
            this.apiObj.url = url + "&" + key + "=" + value;
        } else {
            this.apiObj.url = url + "?" + key + "=" + value;
        }
        return this;
    }

    addFile(data) {
        this.formData = new FormData();
        if (typeof data === 'string') {
            let blobBin = window.atob(data.split(',')[1]);
            let array = [];
            for (let i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            let file = new Blob([new Uint8Array(array)], {
                type: 'image/png'
            });
            this.formData.append("file", file);
        } else if (typeof data === 'object') {
            this.formData.append("file", data);
        }
        return this;
    }

    hideErrorModal() {
        this.isHideErrorModal = true;
        return this;
    }

    toSync() {
        this.shouldSync = true;
        return this;
    }

    useCache(shouldUseCache) {
        this.shouldUseCache = shouldUseCache;
        return this;
    }

    getUrl() {
        return this.apiObj.url;
    }

    // @ Desc : Test를 위한 Mock 데이터를 돌려줍니다.
    requestMock(callbackMock) {
        this.request(true, callbackMock);
    }

    request(isMock, callbackMock) {

        if(!isMock) {
            isMock = false;
        }

        //create ajax option
        let options = {};
        options.cache = false; //https://stackoverflow.com/a/12225591
        options.type = this.apiObj.method;
        options.url = this.apiObj.url;
        if (this.formData) {
            options.data = this.formData;
            options.processData = false;
            options.contentType = false;
            options.enctype = 'multipart/form-data';
        } else {
            options.data = this.jsonData;
            options.dataType = 'json';
            options.contentType = 'application/json';
            options.cache = false;
            options.async = !this.shouldSync;
        }
        options.beforeSend = request => {
            request.setRequestHeader("User-Time-Zone", moment.tz.guess());
            request.setRequestHeader("User-Browser-Language", i18next.language);

            document.body.style.cursor = 'wait';
        };
        options.error = (jqXHR, textStatus, thrownError) => {
			if(textStatus === 'abort') {
				return;
			}

			// TODO : Error Handling 3rd parties are here. ex) Raven

            //handle error
            let requestErrorHandler = new RequestErrorHandler(jqXHR, textStatus, thrownError);
            requestErrorHandler.handleError(this.isHideErrorModal);
        };
        options.success = response =>  {
            if(this.apiObj.method === 'GET') {
				dataCache.set(this.apiObj, response.data);
            } else {
                dataCache.removeAll();
            }

			reduxStore.dispatch(updateApiRequestedTime());
        };
        options.complete = (jqXHR, textStatus) => {
            document.body.style.cursor = 'default';
        };

        //start ajax
        //https://developers.google.com/web/fundamentals/getting-started/primers/promises?hl=ko
        let jsPromise = null;
        if(isMock) {
            options.complete();
            let resultMock = (callbackMock)?callbackMock():{};
            jsPromise = new Promise((resolve, reject) => resolve(resultMock));
        } else if(this.shouldUseCache && this.apiObj.method === 'GET') {
			const cachedResult = dataCache.get(this.apiObj);
			if (cachedResult) {
				options.complete();
				jsPromise = new Promise((resolve, reject) => resolve(cachedResult));
			} else {
				this.xhr = $.ajax(options); //for `.abort`  ref: http://api.jquery.com/jquery.ajax/
				jsPromise = Promise.resolve(this.xhr).then(response => response.data);
			}
		} else if(this.apiObj.method === 'HEAD') {
			this.xhr = $.ajax(options);
			jsPromise = Promise.resolve(this.xhr).then(response => {
				return {data:{success:true}};
			});
        } else {
            this.xhr = $.ajax(options);
            jsPromise = Promise.resolve(this.xhr).then(response => response.data);
        }
        return jsPromise;
    }

	cancel() {
    	if(this.xhr) {
			this.xhr.abort();
		}
	}

}

let DataProviderWrapper = function(api, arg1, arg2, arg3) {
	return new DataProvider(api, arg1, arg2, arg3);
};
DataProviderWrapper.init = function({ store }) {
	reduxStore = store;
};

export default DataProviderWrapper;