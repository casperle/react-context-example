import React from 'react';

import { FlyProvider, FlyContext } from './flyStore';
import { SearchProvider, SearchContext } from './searchStore';

const STORE_CONSUMERS = {
	FLY: FlyContext.Consumer,
	SEARCH: SearchContext.Consumer,
};

const STORE_PROVIDERS = [
	FlyProvider,
	SearchProvider,
];


export const STORE_NAMES = {
	FLY: 'FLY',
	SEARCH: 'SEARCH',
};

export const mountStores = (Component, props, storeNamesArray, storeArgs = {}) => {
  if (storeNamesArray.length && STORE_CONSUMERS[storeNamesArray[0]]) {
		const WrapperComponent = STORE_CONSUMERS[storeNamesArray[0]];

		return (
			<WrapperComponent>
				{
					(args) => {
						storeArgs = Object.assign(storeArgs, args);

						return mountStores(Component, props, storeNamesArray.slice(1), storeArgs);
					}
				}
			</WrapperComponent>
		);
  }
  else {
	return <Component {...props} {...storeArgs} />;
  }
};

export const provideStores = (Component, props, stores = null) => {
	if (stores === null) {
		stores = STORE_PROVIDERS;
	}

	if (stores.length) {
		const WrapperComponent = stores[0];

		return (
			<WrapperComponent>
				{
					provideStores(Component, props, stores.slice(1))
				}
			</WrapperComponent>
		);
	}
	else {
		return <Component {...props} />;
	}
};
