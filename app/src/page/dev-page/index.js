import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import RoutePath from 'Src/RoutePath';
import Common from 'DevPage/common/Common';
import 'style-loader!DevPage/dev-page-theme.less';

class DevPageIndex extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div id="mainPageContainer">
                    <Switch>
                        <Route exact path={RoutePath.DEV_ENTRY} render={() => <Redirect to={RoutePath.DEV.COMMON} />} />
                        <Route path={RoutePath.DEV.COMMON} component={Common} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default DevPageIndex;