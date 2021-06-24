import React, { memo, Suspense } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import routes from './router';
import store from './store';

import { HashRouter } from 'react-router-dom';
import PXAppHeader from '@/components/app-header';
import PXAppFooter from '@/components/app-footer';
import PXAppPlayerBar from './pages/player/app-play-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <PXAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <PXAppPlayerBar />
        <PXAppFooter />
      </HashRouter>
    </Provider>
  );
});
