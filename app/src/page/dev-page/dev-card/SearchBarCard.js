import React, { Component } from 'react';
import SearchBar from 'Component/common/searchbar/SearchBar';
import SearchBarPlace from 'Component/common/searchbar/SearchBarPlace';
import DevCardView from 'DevPage/common/DevCardView';
import _ from 'underscore';

class SearchBarCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	query: "",
            fruits:[
				{
					id: "1",
					name: "Broccoli",
					//imageUrl: "http://www.bordbia.ie/SiteCollectionImages/AboutFood/Vegtables/broccoli.jpg"
				},
				{
					id: "2",
					name: "Apple",
					imageUrl: "http://bestapples.com/wp-content/uploads/2015/10/apple-varieties.jpg"
				},
				{
					id: "3",
					name: "Durian",
					imageUrl: "http://premiummetta.com/cn/wp-content/uploads/2015/08/durian-01.png"
				},
            ]
        };

        this.onChange = this.onChange.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }

    onChange({ userInput }) {
    	this.setState({query: userInput});
        // const results =
        // _.filter(this.state.fruits, (item) => {
        //
        //     if(item && item.name) {
        //         return (-1 < item.name.toLowerCase().indexOf(userInput.toLowerCase()));
        //     }
        //
        //     return false;
        // });
        //
        // this.setState({ results });
    }

	onChangeSearchBarPlace(param) {
    	// console.log("onChangeSearchBarPlace / param : ",param);
	}

    onClickItem({ id }) {
        // TODO : 아이템 선택 뒤의 후처리..
        const clickedItem =
        _.findWhere(this.state.fruits, { id });
    }

    render() {
        return (
            <DevCardView
                name={"SearchBar | SearchBarCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to SearchBarCard.js",
                ]}
                component={
                    <div>
						<div>
							<SearchBar
								query={this.state.query}
								onChange={this.onChange}
								onClickItem={this.onClickItem}
								itemList={this.state.fruits}
							/>
						</div>
						<div style={{marginTop:"10px"}}>
							<SearchBarPlace
								style={{width:"50%"}}
								onChange={this.onChangeSearchBarPlace}
							/>
						</div>
                    </div>
                }
                code={
                    <div>
                        <div className="nt">Not supported</div>
                    </div>
                }
            />
        );
    }
}

export default SearchBarCard;