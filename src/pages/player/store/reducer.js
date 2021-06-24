import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  playList: [
    {
      name: '爱情慢慢来',
      id: 1846292840,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 33942394,
          name: 'Stake',
          tns: [],
          alias: []
        },
        {
          id: 32827173,
          name: 'TwoP',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 3,
      crbt: null,
      cf: '',
      al: {
        id: 127683955,
        name: '爱情慢慢来',
        picUrl:
          'https://p1.music.126.net/MkdxK63QpQhCScxPEBs8Og==/109951165992566587.jpg',
        tns: [],
        pic_str: '109951165992566587',
        pic: 109951165992566600
      },
      dt: 195520,
      h: {
        br: 320000,
        fid: 0,
        size: 7823195,
        vd: -38172
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4693934,
        vd: -35575
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3129304,
        vd: -33945
      },
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 262144,
      originCoverType: 0,
      originSongSimpleData: null,
      resourceState: true,
      single: 0,
      noCopyrightRcmd: null,
      rurl: null,
      mst: 9,
      cp: 2706408,
      mv: 0,
      rtype: 0,
      publishTime: 1621526400000
    },
    {
      name: "Can't Get U Off Ma Mine (Edit)",
      id: 1852600105,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 35638077,
          name: 'Ro Ryon',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 3,
      crbt: null,
      cf: '',
      al: {
        id: 128871543,
        name: "Can't Get U Off Ma Mine (Edit)",
        picUrl:
          'https://p2.music.126.net/Y_O7blDkMNBQswlqP-EndQ==/109951166080094567.jpg',
        tns: [],
        pic_str: '109951166080094567',
        pic: 109951166080094560
      },
      dt: 112388,
      h: {
        br: 320000,
        fid: 0,
        size: 4498329,
        vd: -18464
      },
      m: {
        br: 192000,
        fid: 0,
        size: 2699015,
        vd: -15838
      },
      l: {
        br: 128000,
        fid: 0,
        size: 1799358,
        vd: -14172
      },
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 270464,
      originCoverType: 0,
      originSongSimpleData: null,
      resourceState: true,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      mst: 9,
      rtype: 0,
      rurl: null,
      cp: 743010,
      publishTime: 1623513600000
    },
    {
      name: '好久不见',
      id: 1847422867,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12079066,
          name: 'Lil Jet',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 6,
      crbt: null,
      cf: '',
      al: {
        id: 127857194,
        name: '好久不见',
        picUrl:
          'https://p1.music.126.net/8nxYZ64Z3v-6PaQWibygVQ==/109951166069091920.jpg',
        tns: [],
        pic_str: '109951166069091920',
        pic: 109951166069091920
      },
      dt: 230844,
      h: {
        br: 320000,
        fid: 0,
        size: 9233807,
        vd: -56232
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5540302,
        vd: -53752
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3693549,
        vd: -52180
      },
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      originSongSimpleData: null,
      resourceState: true,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      publishTime: 0
    }
  ],
  currentSongIndex: 0,
  currentSong: {},
  sequence: 0, // 0 循环 1 随机 2 单曲
  lyricList: []
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set('playList', action.playList);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.index);
    case actionTypes.CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence);
    case actionTypes.CHANGE_LYRIC:
      return state.set('lyricList', action.lyricList);
    default:
      return state;
  }
}

export default reducer;
