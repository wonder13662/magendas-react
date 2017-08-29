/**
 * App 내부의 여러 View에서 전역적으로 사용되는 데이터들을 관리하는 Util
 * Key: API.url, Value: 해당 url 요청 결과
 */
let dataMap = {};

export default class DataCache {
	constructor() {
		this.createKey = this.createKey.bind(this);
		this.get = this.get.bind(this);
		this.set = this.set.bind(this);
		this.remove = this.remove.bind(this);
		this.removeAll = this.removeAll.bind(this);
	}

	createKey(api) {
		return api.url + "_" + api.method;
	}

	get(api) {
		const key = this.createKey(api);
		return dataMap[key];
	}

	set(api, result) {
		const key = this.createKey(api);
		dataMap[key] = result;
	}

	remove(api) {
		const dataKey = this.createKey(api);
		delete dataMap[dataKey];
	}

	removeAll() {
		dataMap = {};
	}
}
