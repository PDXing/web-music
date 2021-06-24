import * as actionTypes from './constants';

import { getRandomNumber } from '@/utils/math-utils';
import { parseLyric } from '@/utils/parse-lyric';

import { getSongDetail, getLyric } from '@/services/player';

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
});

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
});

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
});

const changeLyricAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC,
  lyricList
});

export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
});

export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispath, getState) => {
    const playList = getState().getIn(['player', 'playList']);
    const sequence = getState().getIn(['player', 'sequence']);
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex']);

    switch (sequence) {
      case 1: // 随机播放
        let randomIndex = getRandomNumber(playList.length);
        while (currentSongIndex === randomIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        currentSongIndex = randomIndex;
        break;
      default:
        // 顺序播放
        currentSongIndex += tag;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
    }

    const currentSong = playList[currentSongIndex];
    dispath(changeCurrentSongAction(currentSong));
    dispath(changeCurrentSongIndexAction(currentSongIndex));
    dispath(getLyricAction(currentSong.id));
  };
};

export const getSongDetailAction = (ids) => {
  return (dispath, getState) => {
    // 根据id 从 playList中查找歌曲
    const playList = getState().getIn(['player', 'playList']);
    const songIndex = playList.findIndex((song) => song.id === ids);
    // 判断是否找到了歌曲
    if (songIndex !== -1) {
      // 找到了
      dispath(changeCurrentSongIndexAction(songIndex));
      const song = playList[songIndex];
      dispath(changeCurrentSongAction(song));
      // 获取歌词
      dispath(getLyricAction(song.id));
    } else {
      // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then((res) => {
        const song = res.songs && res.songs[0];
        if (!song) return;

        // 将最新请求的数据添加到列表中
        const newList = [...playList];
        newList.push(song);

        // 更新 redux 数据
        dispath(changePlayListAction(newList));
        dispath(changeCurrentSongIndexAction(newList.length - 1));

        dispath(changeCurrentSongAction(song));
        // 获取歌词
        dispath(getLyricAction(song.id));
      });
    }
  };
};

export const getLyricAction = (id) => {
  return (dispath) => {
    getLyric(id).then((res) => {
      // console.log(res);
      const lrcList = parseLyric(res.lrc.lyric);
      // console.log(lrcList);
      dispath(changeLyricAction(lrcList));
    });
  };
};
