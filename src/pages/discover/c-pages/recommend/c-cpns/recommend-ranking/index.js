import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getTopListAction } from '../../store/actionCreators';

import PXThemeHeaderRCM from '@/components/theme-header-rcm';
import PXTopRanking from '@/components/top-ranking';

import { RankingWrapper } from './style';

export default memo(function PXRecommendRanking() {
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
      originRanking: state.getIn(['recommend', 'originRanking'])
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <PXThemeHeaderRCM title="榜单" />
      <div className="tops">
        <PXTopRanking info={upRanking} />
        <PXTopRanking info={newRanking} />
        <PXTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  );
});
