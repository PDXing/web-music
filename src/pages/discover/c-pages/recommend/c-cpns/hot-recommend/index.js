import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { HOT_RECOMMEND_LIMIT } from '@/common/contants';
import { getHotRecommendAction } from '../../store/actionCreators';

import PXThemeHeaderRCM from '@/components/theme-header-rcm';
import PXSongsCover from '@/components/songs-cover';

import { HotRecommendWrapper } from './style';

export default memo(function PXHotRecommend() {
  // state
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends'])
    }),
    shallowEqual
  );

  // redux hooks
  const dispatch = useDispatch();

  // other hoosk
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <PXThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
      />
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return <PXSongsCover key={item.id} info={item} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
});
