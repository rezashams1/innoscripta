import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAppSelector } from '../../redux/hooks';
import { CAvatar, CButton } from '../mui';

const Box = styled.nav`
  max-width: 1440px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0;

  > .logo {
    margin-right: 20px;

    > span {
      font-size: 20px;
      font-weight: 800;
      color: ${(props) => props.theme.red100};
    }
  }

  > .links {
    border-left: 1px solid ${(props) => props.theme.black50};
    padding-left: 20px;
    flex-grow: 1;

    > a {
      font-size: 16px;
      color: ${(props) => props.theme.black80};
    }
  }
`;

export function Menu(): ReactElement {
  const user = useAppSelector((state) => state.user);

  return (
    <Box>
      <div className="logo">
        <span>News Agency</span>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
      </div>

      <div className="actions">
        {user.id === 0 ? (
          <Link to="/register">
            <CButton>register</CButton>
          </Link>
        ) : (
          <Link to="/profile">
            <CAvatar src={'https://picsum.photos/50/50'} />
          </Link>
        )}
      </div>
    </Box>
  );
}
