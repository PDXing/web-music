import * as actionTypes from './constants';

import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList
} from '@/services/recommend';

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
});

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result
});

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUMS,
  newAlbums: res.albums
});

const changeUpRankingAction = (res) => ({
  type: actionTypes.CHNAGE_UP_RANKING,
  upRanking: res.playlist
});
const changeNewRankingAction = (res) => ({
  type: actionTypes.CHNAGE_NEW_RANKING,
  newRanking: res.playlist
});
const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHNAGE_ORIGIN_RANKING,
  originRanking: res.playlist
});

export const getTopBannerAction = () => {
  return (dispath) => {
    getTopBanners().then((res) => {
      dispath(changeTopBannerAction(res));
    });
  };
};

export const getHotRecommendAction = (limit) => {
  return (dispath) => {
    getHotRecommends(limit).then((res) => {
      dispath(changeHotRecommendAction(res));
    });
  };
};

export const getNewAlbumAction = (limit) => {
  return (dispath) => {
    getNewAlbums(limit).then((res) => {
      dispath(changeNewAlbumAction(res));
    });
  };
};

export const getTopListAction = (idx) => {
  return (dispath) => {
    getTopList(idx).then((res) => {
      switch (idx) {
        case 0:
          dispath(changeNewRankingAction(res));
          break;
        case 2:
          dispath(changeOriginRankingAction(res));
          break;
        case 3:
          dispath(changeUpRankingAction(res));
          break;
        default:
      }
    });
  };
};
