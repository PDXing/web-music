import React, { memo } from 'react';

import { LyricWrapper } from './style';

export default memo(function PXLyric(props) {
  const { lyric } = props;

  return (
    <LyricWrapper>
      <div className="content">{lyric}</div>
    </LyricWrapper>
  );
});
