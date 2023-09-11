import React, { type ReactElement } from 'react'
import { styled } from 'styled-components'
import { CAvatar } from '../../components/mui'
import { Link } from 'react-router-dom'
import { News } from '../../interfaces/news'
import _ from 'lodash'
import TimeAgo from 'javascript-time-ago'

const Box = styled.div`
  display: flex;
  flex-direction: column;

  > .img {
    margin-bottom: 10px;

    > img {
      display: block;
      width: 100%;
      border-radius: 8px;
    }
  }

  > .author {
    display: flex;
    flex-direction: row;
    align-items: center;

    > div {
      margin-right: 10px;
    }

    > span {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.black60};
    }
  }

  > .headline {
    margin-top: 20px;

    > a {
      font-size: 24px;
      font-weight: 500;
      color: ${(props) => props.theme.black80};
    }
  }

  > .body {
    margin-top: 10px;
    flex: 1;

    > p {
      font-size: 14px;
      font-weight: 300;
      color: ${(props) => props.theme.black80};
      margin: 0;
    }
  }

  > .source {
    margin-top: 10px;

    > span {
      font-size: 12px;
      font-weight: normal;
      color: ${(props) => props.theme.red100};
    }

    > small {
      font-size: 10px;
      font-weight: normal;
      color: ${(props) => props.theme.black50};
      padding-left: 10px;
    }
  }

  &:hover {
    > .headline {
      > a {
        color: ${(props) => props.theme.red100};
      }
    }
  }
`;

interface Props {
  article: News;
}

export const NewsBox = (props: Props): ReactElement => {
    const { article } = props
    const timeAgo = new TimeAgo('en-US')

    return (
      <Box>
        <div className="img">
          <img src={`https://picsum.photos/200/200?random=${article.id}`} />
        </div>
  
        <div className="author">
          <CAvatar src={`https://picsum.photos/50/50?random=${article.id}`} />
          <span>{article.author.title}</span>
        </div>
  
        <div className="headline">
          <Link to="/">{article.title}</Link>
        </div>
  
        <div className="body">
          <p>{_.get(article, 'content', '').substring(0, 200)}</p>
        </div>
  
        <div className="source">
          <span>{article.source.title}</span>
          <small>{timeAgo.format(new Date(article.date))}</small>
        </div>
      </Box>
    );
};
