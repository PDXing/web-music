import React, { memo } from 'react';

import PXTopBanner from './c-cpns/top-banner';
import PXHotRecommend from './c-cpns/hot-recommend';
import PXNewAlum from './c-cpns/new-album';
import PXRecommendRanking from './c-cpns/recommend-ranking';

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style';

function PXRecommend(props) {
  return (
    <RecommendWrapper>
      <PXTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <PXHotRecommend />
          <PXNewAlum />
          <PXRecommendRanking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  );
}

export default memo(PXRecommend);
