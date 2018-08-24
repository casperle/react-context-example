import React from 'react';

export const FlyContext = React.createContext();

export class FlyProvider extends React.PureComponent {
	state = {
		flyList: [],
		loadingFlights: false,
	};

	updateFlyList = (flyList) => {
		this.setState({
			flyList,
			loadingFlights: false,
		});
	}

	loadingFlightsStarted = () => {
		this.setState({
			loadingFlights: true,
		});
	}

	loadingFlightsFinished = () => {
		this.setState({
			loadingFlights: false,
		});
	}

	render() {
		return (
			<FlyContext.Provider value={{
				...this.state,
				updateFlyList: this.updateFlyList,
				loadingFlightsStarted: this.loadingFlightsStarted,
			}}>
				{this.props.children}
			</FlyContext.Provider>
		);
	}
}
