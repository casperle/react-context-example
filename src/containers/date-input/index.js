import React from 'react';
import moment from 'moment';
import { DateInput as DateInputBP } from '@blueprintjs/datetime';

import { mountStores, STORE_NAMES } from '../../stores/config';

export class DateInputComponent extends React.PureComponent {
	handleChange = (date) => {
		this.props.updateFlyDate(date, this.props.isDepartureDate);

		if (
			this.props.isDepartureDate &&
			this.props.returnDate !== '' &&
			moment(date).isAfter(this.props.returnDate)
		) {
			this.props.updateFlyDate(new Date(moment(date).add(1, 'd').toString()), false);
		}
	}

	getDateInputProps() {
		return {
			readOnly: true,
			large: true,
			leftIcon: 'calendar',
			className: 'date-input',
		};
	}

	getMaxDate() {
		return new Date(moment().add(1, 'y').toString());
	}

	getMinDate() {
		if (!this.props.isDepartureDate && this.props.departureDate) {
			return this.props.departureDate;
		}
		return new Date();
	}

	formatDateHandler(date) {
		return moment(date).format('DD. MMM YYYY');
	}

	parseDateHandler(str) {
		return new Date(str);
	}

	render () {
		return (
			<DateInputBP
				dayPickerProps={{
					firstDayOfWeek: 1,
				}}
				formatDate={this.formatDateHandler}
				parseDate={this.parseDateHandler}
				placeholder={ this.props.isDepartureDate ? 'Departure' : 'Return' }
				minDate={this.getMinDate()}
				maxDate={this.getMaxDate()}
				inputProps={this.getDateInputProps()}
				onChange={this.handleChange}
				value={ this.props.isDepartureDate ? this.props.departureDate : this.props.returnDate }
			/>
		);
	}
}

export const DateInput = (props) => mountStores(DateInputComponent, props, [ STORE_NAMES.SEARCH ]);
