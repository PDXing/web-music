import React, { memo } from 'react';

import { PlayerWrapper, PlayerLeft, PlayerRight } from './style';
export default memo(function PXPlayer() {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>1</h2>
          <h2>2</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>3</h2>
          <h2>4</h2>
          <h2>5</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
});
