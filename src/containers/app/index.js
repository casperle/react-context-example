import React from 'react';

import { Header } from '../header';
import { Content } from '../content';

import { withProviders } from '../../stores/config';

import { SearchProvider } from '../../stores/searchStore';
import { FlyProvider } from '../../stores/flyStore';

const AppComponent = () => (
  <React.Fragment>
    <Header />
    <Content />
  </React.Fragment>
);

export const App = withProviders(SearchProvider, FlyProvider)(AppComponent);
