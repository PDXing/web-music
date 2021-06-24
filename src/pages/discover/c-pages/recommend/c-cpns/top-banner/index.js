import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import { getTopBannerAction } from '../../store/actionCreators';

import { Carousel } from 'antd';
import { BannerWrapper, BannerControl, BannerLeft, BannerRight } from './style';

export default memo(function PXTopBanner() {
  // 组件内状态
  const [currentIndex, setCurrentIndex] = useState(0);

  // 组件和redux关联 获取数据操作
  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(['recommend', 'topBanners'])
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  // 其他hooks
  const bannerRef = useRef();

  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);

  // 其他业务逻辑
  const bgImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + '?imageView&blur=40x20';

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            effect="fade"
            autoplay
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
