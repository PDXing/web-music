import React, { memo } from 'react';

import { getCount, getSizeImage } from '@/utils/format-utils';

import { SongsCoverWrapper } from './style';

export default memo(function PXSongsCover(props) {
  const { info, wrap = false } = props;

  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={getSizeImage(info.picUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className={'cover-bottom ' + (wrap && 'text-nowrap')}>
        {info.name}
      </div>
      {wrap && (
        <div className="cover-source text-nowrap">
          by {info.copywriter || info.creator.nickname}
        </div>
      )}
    </SongsCoverWrapper>
  );
});
