import React from 'react';

export const withProviders = (...providers) => Component => props => {
  const mountProviders = providersArray => {
    if (providersArray.length) {
      const WrapperProvider = providersArray[0];

      return <WrapperProvider>{mountProviders(providersArray.slice(1))}</WrapperProvider>;
    } else {
      return <Component {...props} />;
    }
  };

  return mountProviders(providers);
};

export const withConsumers = (...consumers) => Component => props => {
  const mountConsumers = (consumersArray, consumerProps = {}) => {
    if (consumersArray.length) {
      const WrapperConsumer = consumersArray[0];

      return (
        <WrapperConsumer>
          {consumerValues => mountConsumers(consumersArray.slice(1), { ...consumerProps, ...consumerValues })}
        </WrapperConsumer>
      );
    } else {
      return <Component {...props} {...consumerProps} />;
    }
  };

  return mountConsumers(consumers);
};
