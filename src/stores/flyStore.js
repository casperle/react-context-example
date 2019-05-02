import React from 'react';

export const FlyContext = React.createContext();
export const FlyConsumer = FlyContext.Consumer;

export class FlyProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flyList: [],
      loadingFlights: false,
      // Preventing unnecessary re-render
      updateFlyList: this.updateFlyList,
      loadingFlightsStarted: this.loadingFlightsStarted,
      loadingFlightsFinished: this.loadingFlightsFinished,
    };
  }

  updateFlyList = flyList => {
    this.setState({
      flyList,
      loadingFlights: false,
    });
  };

  loadingFlightsStarted = () => {
    this.setState({
      loadingFlights: true,
    });
  };

  loadingFlightsFinished = () => {
    this.setState({
      loadingFlights: false,
    });
  };

  render() {
    return <FlyContext.Provider value={this.state}>{this.props.children}</FlyContext.Provider>;
  }
}
