import React from 'react';

import { Header } from '../header';
import { Content } from '../content';

import { provideStores } from '../../stores/config';

const AppComponent = () => (
	<React.Fragment>
		<Header />
		<Content />
	</React.Fragment>
);

export const App = () => provideStores(AppComponent);
