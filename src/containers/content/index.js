import React from 'react';

import { SearchForm } from '../search-form';
import { FlyList } from '../fly-list';

export const Content = () => (
	<React.Fragment>
		<SearchForm />
		<FlyList />
	</React.Fragment>
);
