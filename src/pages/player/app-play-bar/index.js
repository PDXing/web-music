import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  getSizeImage,
  formatMinuteSecond,
  getPlaySong
} from '@/utils/format-utils';

import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction
} from '../store/actionCreators';

import { NavLink } from 'react-router-dom';
import { Slider } from 'antd';
import PXLyric from './c-cpns/lyric';

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style';

export default memo(function PXAppPlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [lyric, setLyric] = useState();

  const { currentSong, sequence, playList, lyricList } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong']),
      sequence: state.getIn(['player', 'sequence']),
      playList: state.getIn(['player', 'playList']),
      lyricList: state.getIn(['player', 'lyricList'])
    }),
    shallowEqual
  );

  const audioRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongDetailAction(1827600686));
  }, [dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  const picUrl = (currentSong.al && currentSong.al.picUrl) || '';
  const singerName = currentSong.ar || [];
  const duration = currentSong.dt || 0;

  const playMusic = useCallback(() => {
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(!isPlaying);
    // console.log(audioRef.current);
  }, [isPlaying]);

  const timeUpdate = (e) => {
    // console.log(e.target.currentTime * 1000);
    let ctime = e.target.currentTime * 1000;
    nowLyric(ctime);
    if (!isChange) {
      setCurrentTime(e.target.currentTime * 1000);
      setProgress((currentTime / duration) * 100);
    }
  };

  const nowLyric = (ctime) => {
    for (let i = 0; i < lyricList.length; i++) {
      if (ctime >= lyricList[i].time && ctime <= lyricList[i + 1].time) {
        setLyric(lyricList[i].content);
        break;
      }
    }
  };

  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };

  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag));
  };

  const handleMusicEnded = () => {
    if (sequence === 2) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  };

  const sliderChange = useCallback(
    (value) => {
      setIsChange(true);
      setProgress(value);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChange(false);
      audioRef.current.play();
      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="prev sprite_playbar"
            title="上一首"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="play sprite_playbar"
            onClick={(e) => playMusic()}
            title="播放/暂停"
          ></button>
          <button
            className="next sprite_playbar"
            title="下一首"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span>{currentSong.name}</span>
              <a href="todo" className="singer-name">
                {singerName.map((item, index) => {
                  return index === singerName.length - 1
                    ? item.name
                    : item.name + '/';
                })}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
                tooltipVisible={false}
              />
              <div className="time">
                <span className="now-time">
                  {formatMinuteSecond(currentTime)}
                </span>
                <span className="divider">/</span>
                <span className="duration">{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_playbar btn playlist">
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded(e)}
      />
      <PXLyric lyric={lyric} />
    </PlaybarWrapper>
  );
});
