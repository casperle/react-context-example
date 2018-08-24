import React from 'react';
import { Spinner } from '@blueprintjs/core';

import { FlyItem } from './components/fly-item';

import { mountStores, STORE_NAMES } from '../../stores/config';


const FlyListComponent = (props) => (
	props.loadingFlights ?
		<div className="flights-spinner">
			<Spinner size={100} intent="primary" />
		</div> :
		<React.Fragment>
			{props.flyList.map((flyItem) => <FlyItem key={flyItem.id} fly={flyItem} />)}
		</React.Fragment>
);

export const FlyList = (props) => mountStores(FlyListComponent, props, [ STORE_NAMES.FLY ]);
