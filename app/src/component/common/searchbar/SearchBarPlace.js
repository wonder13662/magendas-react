import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import ArrayUtil from 'Util/ArrayUtil';

import 'style-loader!Component/common/searchbar/searchbar-place.less';

/*
	@ Reference : https://www.npmjs.com/package/react-places-autocomplete
	@ Live Demo : https://kenny-hibino.github.io/react-places-autocomplete/
	@ JSFiddler : https://jsfiddle.net/api/post/library/pure/
 */

const COMPONENT_FORM = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	country: 'long_name',
	postal_code: 'short_name'
};

class SearchBarPlace extends Component {

	constructor(props) {
		super(props);

		this.state = {
			address: 'San Francisco, CA'
		};

		this.onChange = this.onChange.bind(this);
		this.onClickSubmitButton = this.onClickSubmitButton.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	onChange(address) {
		this.setState({ address });
	}

	onClickSubmitButton(event) {
		// Do something...
		// console.log(">>> onClickSubmitButton");
	}

	handleFormSubmit(event) {

		event.preventDefault();

		geocodeByAddress(this.state.address)
			.then(places => {

				if(!ArrayUtil.isValid(places)) {
					return;
				}

				const place = places[0];

				// Get each component of the address from the place details
				// and fill the corresponding field on the form.
				let addressNext = {};
				for (var i = 0; i < place.address_components.length; i++) {
					var addressType = place.address_components[i].types[0];
					if (COMPONENT_FORM[addressType]) {
						var val = place.address_components[i][COMPONENT_FORM[addressType]];
						
						let addressInfo = {};
						addressInfo[`${addressType}`] = val;
						addressNext = Object.assign(addressNext, addressInfo);
					}
				}

				if(this.props.onChange) {
					this.props.onChange(addressNext);
				}

				getLatLng(place);
			})
			.catch(error => console.error('Error', error));

	}

	render() {
		const inputProps = {
			value: this.state.address,
			onChange: this.onChange,
			placeholder: 'Where is your office?',
		};

		// const autocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>&nbsp;{suggestion}</div>);
		const autocompleteItem = ({ formattedSuggestion }) => (
			<div style={{backgroundColor:"transparent"}}>
				<strong>{ formattedSuggestion.mainText }</strong>{' '}
				<small>{ formattedSuggestion.secondaryText }</small>
			</div>
		);

		const cssClasses = {
			root: 'form-group',
			input: 'form-control',
			autocompleteContainer: 'autocomplete-container',
			autocompleteItem: 'autocomplete-item',
			autocompleteItemActive: 'autocomplete-item-active',
		};

		const className = `swv-search-bar-place ${this.props.className}`;

		return (
			<form className={className} style={this.props.style} onSubmit={this.handleFormSubmit}>
				<PlacesAutocomplete
					inputProps={inputProps}
					autocompleteItem={autocompleteItem}
					classNames={cssClasses}
				/>
				<button
					title="Submit"
					type="submit"
					onClick={this.onClickSubmitButton}
					/>
			</form>
		);
	}
}

SearchBarPlace.propTypes = {
	className:PropTypes.string,
	style:PropTypes.object,
	onChange:PropTypes.func,
};

SearchBarPlace.defaultProps = {
	className:"",
	style:{},
	onChange:null,
};

export default SearchBarPlace;