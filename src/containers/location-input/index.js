import React from 'react';
import axios from 'axios';
import { Popover, InputGroup } from '@blueprintjs/core';
import debounce from 'lodash/debounce';

import { mountStores, STORE_NAMES } from '../../stores/config';

class LocationInputComponent extends React.PureComponent {
	_requestSource = null;
	_inputDebounceTime = 500;

	state = {
		locationSuggestions: [],
		inputValue: '',
		loading: true,
		isPopoverOpen: false,
	};

	loadLocations = debounce(async (value) => {
		const params = {
			term: value,
			locale: 'en-US',
			limit: 15,
		};

		if (this._requestSource) {
			this._requestSource.cancel();
		}

		try {
			this._requestSource = axios.CancelToken.source();
			const placesResponse = await axios.get(
				'https://api.skypicker.com/locations?location_types=city&location_types=country',
				{
					params,
					cancelToken: this._requestSource.token,
				}
			);

			const places = placesResponse.data.locations
				.map((place) => ({
						id: place.id,
						fullName: `${place.code} ${place.name} ${place.country ? `(${place.country.name})` : ''}`,
				}));

			this.setState({ locationSuggestions: places, loading: false });
		}
		catch (e) {
			console.log(e); /* eslint-disable-line no-console */
		}
		finally {
			this._requestSource = null;
		}
	}, this._inputDebounceTime)

	createSuggestionClickHandler = (location) => () => {
		this.setState({ inputValue: location.fullName, isPopoverOpen: false });
		this.props.updateLocationId(location.id, this.props.isLocationFrom);
	}

	handleInputValueChange = (event) => {
		const value = event.target.value;

		this.setState({ inputValue: value, loading: true });

		if (value.length > 1) {
			this.setState({ isPopoverOpen: true });
			this.loadLocations(value);
		}
		else {
			this.setState({ isPopoverOpen: false });
		}

		if (this.props.selectedLocationId !== '') {
			this.props.updateLocationId('', this.props.isLocationFrom);
		}
	}

	getPopoverContent = () => {
		const itemClass = 'location_input__suggestion__item';
		const $noResult = <div className={itemClass}>No results</div>;
		const $loading = <div className={itemClass}>Loading...</div>;
		const $suggestionItems = (this.state.locationSuggestions).map(
			(location) => (
				<div
					className={itemClass}
					onClick={this.createSuggestionClickHandler(location)}
					key={location.id}
				>
					{location.fullName}
				</div>
			)
		);
		const $content = this.state.locationSuggestions.length ? $suggestionItems : $noResult;

		return this.state.loading ? $loading : $content;
	};

	render() {
		return (
			<Popover
				content={this.getPopoverContent()}
				isOpen={this.state.inputValue.length > 1 && this.state.isPopoverOpen}
			>
				<InputGroup
					className="location_input"
					large={true}
					value={this.state.inputValue}
					onChange={this.handleInputValueChange}
					leftIcon="locate"
					placeholder={ this.props.isLocationFrom ? 'From' : 'To' }
				/>
			</Popover>
		);
	}
}

export const LocationInput = (props) => mountStores(LocationInputComponent, props, [ STORE_NAMES.SEARCH ]);
