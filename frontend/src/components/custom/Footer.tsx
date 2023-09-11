import React, { type ReactElement } from 'react';
import { styled } from 'styled-components';

const Box = styled.div`
  background-color: ${(props) => props.theme.black5};
  border-radius: 8px;
  padding: 20px;
  width: 95%;
  max-width: 1440px;
  margin: 40px auto;
  box-sizing: border-box;

  > h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 10px;
    color: ${(props) => props.theme.black80};
  }
`;

export function Footer(): ReactElement {
  return (
    <Box>
      <h1>News Agency</h1>
    </Box>
  );
}
