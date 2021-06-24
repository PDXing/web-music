import React from 'react';
import { Redirect } from 'react-router-dom';

import PXDiscover from '@/pages/discover';
import PXRecommend from '@/pages/discover/c-pages/recommend';
import PXRanking from '@/pages/discover/c-pages/ranking';
import PXSongs from '@/pages/discover/c-pages/songs';
import PXDjradio from '@/pages/discover/c-pages/djradio';
import PXArtist from '@/pages/discover/c-pages/artist';
import PXAlbum from '@/pages/discover/c-pages/album';
import PXPlayer from '@/pages/player';

import PXMine from '@/pages/mine';
import PXFriend from '@/pages/friend';

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/discover" />
  },
  {
    path: '/discover',
    component: PXDiscover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        component: PXRecommend
      },
      {
        path: '/discover/ranking',
        component: PXRanking
      },
      {
        path: '/discover/songs',
        component: PXSongs
      },
      {
        path: '/discover/djradio',
        exact: true,
        component: PXDjradio
      },
      {
        path: '/discover/artist',
        component: PXArtist
      },
      {
        path: '/discover/album',
        component: PXAlbum
      },
      {
        path: '/discover/player',
        component: PXPlayer
      }
    ]
  },
  {
    path: '/mine',
    component: PXMine
  },
  {
    path: '/friend',
    component: PXFriend
  }
];

export default routes;
