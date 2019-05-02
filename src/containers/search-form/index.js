import React from 'react';
import moment from 'moment';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { Button } from '@blueprintjs/core';

import { DateInput } from '../date-input';
import { LocationInput } from '../location-input';

import { SearchConsumer } from '../../stores/searchStore';
import { FlyConsumer } from '../../stores/flyStore';
import { withConsumers } from '../../stores/config';

export class SearchFormComponent extends React.PureComponent {
  _requestFlights = null;
  _searchDebounceTime = 300;

  handleSearch = debounce(async () => {
    this.props.loadingFlightsStarted();
    const departureDate = moment(this.props.departureDate).format('DD/MM/YYYY');
    const returnDate = moment(this.props.returnDate).format('DD/MM/YYYY');

    const params = {
      v: '2',
      locale: 'cz',
      flyFrom: this.props.locationFrom,
      to: this.props.locationTo,
      dateFrom: departureDate,
      dateTo: departureDate,
      returnFrom: returnDate,
      returnTo: returnDate,
      limit: 15,
    };

    if (this._requestFlights) {
      this._requestFlights.cancel();
    }

    try {
      this._requestFlights = axios.CancelToken.source();
      const flightsResponse = await axios.get('https://api.skypicker.com/flights', {
        params,
        cancelToken: this._requestFlights.token,
      });

      const flights = flightsResponse.data.data.map(fly => {
        return {
          id: fly.id,
          bookingToken: fly.booking_token /* eslint-disable-line */,
          duration: fly.fly_duration /* eslint-disable-line */,
          from: `${fly.cityFrom} (${fly.flyFrom})`,
          to: `${fly.cityTo} (${fly.flyTo})`,
          departureTime: moment.unix(fly.dTime).format('DD. MMM H:mm'),
          arrivalTime: moment.unix(fly.aTime).format('DD. MMM H:mm'),
          price: fly.price,
          currency: flightsResponse.data.currency,
        };
      });

      this.props.updateFlyList(flights);
    } catch (e) {
      console.log(e); /* eslint-disable-line no-console */
    } finally {
      this._requestFlights = null;
    }
  }, this._searchDebounceTime);

  isSearchButtonValid() {
    return (
      moment(this.props.departureDate).isValid() &&
      moment(this.props.returnDate).isValid() &&
      this.props.locationFrom !== '' &&
      this.props.locationTo !== ''
    );
  }

  render() {
    return (
      <div className="search-form__container">
        <LocationInput isLocationFrom={true} />
        <LocationInput isLocationFrom={false} />
        <DateInput isDepartureDate={true} />
        <DateInput isDepartureDate={false} />
        <Button onClick={this.handleSearch} icon="geosearch" large={true} disabled={!this.isSearchButtonValid()}>
          Search
        </Button>
      </div>
    );
  }
}

export const SearchForm = withConsumers(SearchConsumer, FlyConsumer)(SearchFormComponent);
