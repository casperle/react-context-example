import React from 'react';

export const SearchContext = React.createContext();
export const SearchConsumer = SearchContext.Consumer;

export class SearchProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locationFrom: '',
      locationTo: '',
      departureDate: null,
      returnDate: null,
      // Preventing unnecessary re-render
      updateLocationId: this.updateLocationId,
      updateFlyDate: this.updateFlyDate,
    };
  }

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

  render() {
    return <SearchContext.Provider value={this.state}>{this.props.children}</SearchContext.Provider>;
  }
}
