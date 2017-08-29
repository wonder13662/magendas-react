import React, { Component } from 'react';
import SearchTextFilter from 'Component/common/filter/SearchTextFilter';
import DevCardView from 'DevPage/common/DevCardView';
import _ from 'underscore';

class SearchTextFilterCard extends Component {

	// TODO : Input.js와 동일한 역할이 많음.

    constructor(props) {
        super(props);

        this.userList = [
            {
                id:1,
                name:"Joe Black"
            },
            {
                id:2,
                name:"Cathy White"
            },
            {
                id:3,
                name:"Newt Pink"
            }
        ];

        this.state = {
            isDisable:false,
            userList:this.userList
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(param) {

        if(param && param.userInput) {
            const userListFiltered =
            _.filter(this.userList, (item) => {

                if(item && item.name) {
                    return (-1 < item.name.toLowerCase().indexOf(param.userInput.toLowerCase()));
                }

                return false;
            });

            this.setState({
                userList:userListFiltered
            });
            return;
        }

        this.setState({
            userList:this.userList
        });
    }

    drawSampleUserList() {
        const listItems = this.state.userList.map((user, index) =>
            <li key={index}>
                {user.name}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    render() {
        return (
            <DevCardView
                name={"SearchTextFilter"}
                desc={[
                    "<code>text</code> sets Input text",
                    "<code>message</code> sets Label text",
                    "<code>placeholder</code> sets Input placeholder",
                    "<code>style</code> sets Input CSS style",
                    "<code>itemList</code> sets target searchable list",
                    "<code>onChange</code> sets onChange function after user input changed",
                ]}
                component={
                    <div>
                        <SearchTextFilter
                            text={""}
                            message={"Who are you looking for?"}
                            placeholder={"Search employee name"}
                            style={{width:"200px"}}
                            itemList={this.userList}
                            onChange={this.onChange}
                        />
                        {this.drawSampleUserList()}
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;SearchTextFilter</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;text=&#123;&#34;&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;message=&#123;&#34;Who are you looking for?&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;placeholder=&#123;&#34;Search employee name&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;width:&#34;200px&#34;&#125;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;itemList=&#123;this.state.userList&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onChange=&#123;this.onChange&#125;</div>
                        <div className="nt">/&gt;</div>
                    </div>
                }
            />
        );
    }
}

export default SearchTextFilterCard;