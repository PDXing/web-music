import React, { memo, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getNewAlbumAction } from '../../store/actionCreators';

import { NEW_ALBUM_LIMIT, NEW_ALBUM_PRE_PAGE } from '@/common/contants';

import PXThemeHeaderRCM from '@/components/theme-header-rcm';
import { Carousel } from 'antd';
import PXAlbunCover from '@/components/album-cover';

import { AlbumWrapper } from './style';

export default memo(function PXNewAlum() {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums'])
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT));
  }, [dispatch]);

  const albumRef = useRef();

  return (
    <AlbumWrapper>
      <PXThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => albumRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel ref={albumRef} dots={false}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums
                    .slice(
                      item * NEW_ALBUM_PRE_PAGE,
                      (item + 1) * NEW_ALBUM_PRE_PAGE
                    )
                    .map((iten) => {
                      return (
                        <PXAlbunCover
                          key={iten.id}
                          info={iten}
                          size={100}
                          width={118}
                          bgp={-570}
                        />
                      );
                    })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => albumRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  );
});
