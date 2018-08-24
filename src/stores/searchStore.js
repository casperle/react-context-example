import React from 'react';

export const SearchContext = React.createContext();

export class SearchProvider extends React.PureComponent {
	state = {
		locationFrom: '',
		locationTo: '',
		departureDate: null,
		returnDate: null,
	};

	updateLocationId = (id, from) => {
		this.setState({
			[from ? 'locationFrom' : 'locationTo']: id,
		});
	};

	updateFlyDate = (date, departure) => {
		this.setState({
			[departure ? 'departureDate' : 'returnDate']: date,
		});
	};

	getProviderValue() {
		return {
			...this.state,
			updateLocationId: this.updateLocationId,
			updateFlyDate: this.updateFlyDate,
		};
	}

	render() {
		return (
			<SearchContext.Provider value={this.getProviderValue()}>
				{this.props.children}
			</SearchContext.Provider>
		);
	}
}
