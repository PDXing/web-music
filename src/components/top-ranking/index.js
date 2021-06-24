import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { getSizeImage } from '@/utils/format-utils';
import { getSongDetailAction } from '@/pages/player/store';

import { TopRankingWrapper } from './style';

export default memo(function PXTopRanking(props) {
  const { info } = props;
  const { tracks = [] } = info;

  const dispatch = useDispatch();

  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id));
  };

  return (
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt="" />
          <a href="todo" className="image_cover" title={info.name}>
            ranking
          </a>
        </div>
        <div className="info">
          <a href="todo" title={info.name}>
            {info.name}
          </a>
          <div>
            <button className="btn play sprite_02" title="播放"></button>
            <button className="btn favor sprite_02" title="收藏"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item, index) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name text-nowrap">
                  <a href="todo" title={item.name}>
                    {item.name}
                  </a>
                </div>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    title="播放"
                    onClick={(e) => playMusic(item)}
                  ></button>
                  <button
                    className="btn sprite_icon2 addto"
                    title="添加到播放列表"
                  ></button>
                  <button className="btn sprite_02 favor" title="收藏"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <a href="todo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  );
});
