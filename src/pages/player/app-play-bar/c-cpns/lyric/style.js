import styled from 'styled-components';

export const LyricWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 52px;
  transform: translateX(-50%);
  .content {
    color: #fff;
    width: max-content;
    background-color: rgb(0 0 0 / 65%);
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;
