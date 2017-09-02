//assets
import RES_STORE_KO from 'Asset/locale/ko.json';
import RES_STORE_EN_US from 'Asset/locale/en-US.json';

//styles
import 'style-loader!bootstrap/dist/css/bootstrap.min.css';
import 'style-loader!font-awesome/less/font-awesome.less';
import 'style-loader!parsleyjs/src/parsley.css';
import 'style-loader!./app-theme.less';

//core libraries
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//pages
import MainPageIndex from 'MainPage';
import DevPageIndex from 'DevPage';
import UnauthorizedPage from 'UnauthorizedPage';
import NotFoundPage from 'NotFoundPage';

//other components
import API from 'Network/Api';
import DataProvider from 'Network/DataProvider';
import Util from 'Util/Util';
import ArrayUtil from 'Util/ArrayUtil';
import AppReducer from 'Store/AppReducer';
import RoutePath from 'Src/RoutePath';
import Toast from 'Helper/Toast';
import LoadingScreen from './LoadingScreen';

import JqueryUtil from 'Util/JqueryUtil';

const loadingScreenContainer = document.getElementById('loadingScreenContainer');
const appContainer = document.getElementById('appContainer');

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<BrowserRouter>
					<div>
						<Switch>
							<Route exact path="/" render={() => <Redirect to={RoutePath.MAIN_ENTRY} />} />
							<Route path={RoutePath.MAIN_ENTRY} render={() => {return (<MainPageIndex session={this.props.session}/>);}} />
							{Util.isDevelopmentEnv() &&
							<Route path={RoutePath.DEV_ENTRY} component={DevPageIndex} />
							}
							<Route component={NotFoundPage}/>
						</Switch>
						{Toast.renderReduxToastr()}
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

//앱 로딩화면 띄움
ReactDOM.render(<LoadingScreen/>, loadingScreenContainer);

let store = null;
if(Util.isDevelopmentEnv()) {
    store = createStore(AppReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    store = createStore(AppReducer);
}

//init jquery custom functions
JqueryUtil.init();

//init DataProvider
DataProvider.init({store});

//init i18next
const supportLanguages = ['ko-KR', 'ko', 'en', 'en-us', 'en-US'];
let browserLang = navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language ||   // All browsers
    navigator.userLanguage;
if (ArrayUtil.includes(supportLanguages, browserLang) === false) {
    browserLang = 'en-US';
}
i18next.init({
    resources: {
	    'ko': {translation: RES_STORE_KO},
        'en-US': {translation: RES_STORE_EN_US}
    },
    fallbackLng: 'en-US',
    lng: browserLang
}, () => {
	//session 호출
    DataProvider(API.SESSION)
		.hideErrorModal()
		// .request() // wonder.jung
        .requestMock(() => {
    		return {
                success:true,
                desc:"This is mock",
			};
		})
		.then(result => {
			ReactDOM.render(<LoadingScreen hide={true}/>, loadingScreenContainer);
			//앱 렌더링
            ReactDOM.render(
            	<AppContainer>
					<App store={store} session={result.session}/>
				</AppContainer>
				,
				appContainer
            );
			if (module.hot) {
				//https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-256958209
				let hotEmitter = require("webpack/hot/emitter");
				hotEmitter.on("webpackHotUpdate", function(currentHash) {
					document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
						const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
						link.href = nextStyleHref;
					});
				});

				// https://github.com/webpack/webpack-dev-server/issues/100
				module.hot.accept();
			}

        }, jhx => {
			ReactDOM.render(<LoadingScreen hide={true}/>, loadingScreenContainer);

			if(jhx.status === 404) {
				// 페이지 없음
				ReactDOM.render(<NotFoundPage/>, appContainer);
			}else if(jhx.responseJSON && jhx.responseJSON.code === 402) {
				// 접근 권한 없음
				ReactDOM.render(<UnauthorizedPage/>, appContainer);
			}else {
				//TODO: 예외처리
			}
		})
		.catch(error => { //then에서 발생한 에러처리

		});
});