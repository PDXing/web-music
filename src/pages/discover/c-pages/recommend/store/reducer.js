import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],

  upRanking: [],
  newRanking: [],
  originRanking: []
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set('topBanners', action.topBanners);
    case actionTypes.CHANGE_HOT_RECOMMENDS:
      return state.set('hotRecommends', action.hotRecommends);
    case actionTypes.CHANGE_NEW_ALBUMS:
      return state.set('newAlbums', action.newAlbums);
    case actionTypes.CHNAGE_UP_RANKING:
      return state.set('upRanking', action.upRanking);
    case actionTypes.CHNAGE_NEW_RANKING:
      return state.set('newRanking', action.newRanking);
    case actionTypes.CHNAGE_ORIGIN_RANKING:
      return state.set('originRanking', action.originRanking);
    default:
      return state;
  }
}

export default reducer;
