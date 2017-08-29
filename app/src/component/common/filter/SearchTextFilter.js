import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextUtil from 'Util/TextUtil';
import 'style-loader!Component/common/filter/search-text-filter.less';

class SearchTextFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            id: "searchTextFilter_" + TextUtil.getUniqueId(),
        };

        this.keyUp = this.keyUp.bind(this);
    }

    keyUp(e) {
        const userInput = e.target.value;

        // input에 입력된 글자 표시
        this.setState({
            text: userInput
        });
        // 최소 검색 단위는 1글자

        // 텍스트가 변하면 외부로 검색을 요청한다.
        if(this.props.onChange) {
            this.props.onChange({userInput:userInput});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isReset) {
            this.setState({text:""});
        }
    }

    render() {

    	const className = `form-group form-inline swv-search-text-filter ${this.props.className}`;

        return (
            <div className={className} style={{margin:"0px"}}>
                {this.props.message &&
                <label
                    htmlFor={this.state.id}
                    style={{"marginRight": "5px"}}>{this.props.message}</label>
                }
                <div className="input-group" style={this.props.boxStyle}>
					{this.props.searchIcon &&
					<i className="fa fa-search"></i>
					}
                    <input
                        id={this.state.id}
                        type="text"
                        value={this.state.text}
                        style={this.props.style}
                        onChange={e => this.keyUp(e)}
                        placeholder={this.props.placeholder}
                        className="input form-control swv-ellipsis"/>
                </div>
            </div>
        );
    }

}

SearchTextFilter.defaultProps = {
    text:"No name",
    message:"",
    placeholder:"Search Keyword",
    className:"",
    style:{},
    boxStyle:{},
    onChange:null,
    isReset:false,
	searchIcon:false,
};

SearchTextFilter.propTypes = {
    text: PropTypes.string,
    message: PropTypes.string,
    placeholder:PropTypes.string,
    className:PropTypes.string,
    style:PropTypes.object,
    boxStyle:PropTypes.object,
    onChange:PropTypes.func,
    isReset:PropTypes.bool,
	searchIcon:PropTypes.bool,
};

export default SearchTextFilter;