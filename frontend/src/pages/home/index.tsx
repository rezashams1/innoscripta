import React, { useState, type ReactElement, useEffect } from 'react'
import { CLoader, Footer, Menu } from '../../components/custom'
import { styled } from 'styled-components'
import { CAvatar, CButton } from '../../components/mui'
import { ControllerAutocomplete, ControllerTextField } from '../../components/rhf'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Author, News, Source } from '../../interfaces/news'
import { NewsService } from '../../services'
import { useGlobalContext } from '../../contexts'
import { NewsBox } from '../../components/news'
import _ from 'lodash'
import { useAppSelector } from '../../redux/hooks'

const TopBox = styled.div`
  background-color: ${(props) => props.theme.black5};
  border-radius: 8px;
  padding: 20px;
  width: 95%;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;

  > h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 10px;
    color: ${(props) => props.theme.black80};
  }

  > p {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: ${(props) => props.theme.black80};
    line-height: 35px;
    margin-bottom: 10px;

    > span {
      color: ${(props) => props.theme.red100};
    }
  }
`

const Featured = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 95%;
  max-width: 1440px;
  margin: 40px auto 0 auto;
  box-sizing: border-box;

  > .img {
    > img {
      border-radius: 8px;
      display: block;
      width: 100%;
    }
  }

  > .info {
    display: flex;
    flex-direction: column;

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

      > span {
        font-size: 32px;
        font-weight: 500;
        color: ${(props) => props.theme.black80};
      }
    }

    > .body {
      margin-top: 20px;
      flex: 1;

      > p {
        font-size: 16px;
        font-weight: normal;
        color: ${(props) => props.theme.black80};
        margin: 0;
      }
    }

    > .source {
      margin-top: 20px;

      > span {
        font-size: 16px;
        font-weight: normal;
        color: ${(props) => props.theme.red100};
      }
    }
  }
`

const Title = styled.div`
  width: 95%;
  max-width: 1440px;
  margin: 40px auto;
  box-sizing: border-box;

  > h5 {
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.black80};
  }
`

const NewsSection = styled.section`
  width: 95%;
  max-width: 1440px;
  margin: 40px auto 0 auto;
  box-sizing: border-box;

  > .filter {
    margin-bottom: 20px;

    > form {
      display: flex;
      flex-direction: row;
      align-items: center;

      > .search, .source, .author, .sort {
        width: 200px;
        margin-right: 20px;
      }

      > .grow {
        flex-grow: 1;
      }
    }
  }

  > .boxes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`

interface Inputs {
  q: string
  source: Source[]
  author: Author[]
  sort: { id: string, title: string }
} 

export const HomePage: React.FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'News Agency';

    return () => {
      document.title = '';
    };
  }, []);

  const { makeAlert } = useGlobalContext()
  const user = useAppSelector((state) => state.user)
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ defaultValues: { q: '', source: [], author: [] } })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)

  const [news, setNews] = useState<News[]>([])

  const [sources, setSources] = useState<Source[]>([])
  const handleSourceSearch = async (searchValue: string): Promise<boolean> => {
    try {
      const search = await NewsService.sources(searchValue, makeAlert)
      setSources(search.data.sources)
    } catch (err) {
      setSources([])
    }

    return true
  }

  const [authors, setAuthors] = useState<Author[]>([])
  const handleAuthorSearch = async (searchValue: string): Promise<boolean> => {
    try {
      const search = await NewsService.authors(searchValue, makeAlert)
      setAuthors(search.data.authors)
    } catch (err) {
      setAuthors([])
    }

    return true
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNews([])
    setIsSubmitting(true)

    NewsService.news({ 
      type: user.id === 0 ? 'all' : 'personalized',
      q: data.q,
      sources: data.source.map(i => i.title).join(','),
      authors: data.author.map(i => i.title).join(','),
      order: _.get(data.sort, 'id', 'desc'),
      skip: 0
     }, makeAlert).then(res => {
      setNews(res.data.news)
      setIsSubmitting(false)
    }).catch(err => {
      setIsSubmitting(false)
    })
  }
  
  useEffect(() => {
    NewsService.news({ 
      type: user.id === 0 ? 'all' : 'personalized',
      skip: 0 ,
      sources: user.id !== 0 ? user.sources.map(i => i.id).join(',') : '',
      authors: user.id !== 0 ? user.authors.map(i => i.id).join(',') : ''
    }, makeAlert).then(res => {
      setNews(res.data.news)
      setIsSubmitting(false)
    }).catch(err => {
      setIsSubmitting(false)
    })
  }, [])

  useEffect(() => {
    if (user.id !== 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [user])

  const loadMore = () => {
    setIsSubmitting(true)

    NewsService.news({ 
      type: user.id === 0 ? 'all' : 'personalized',
      q: watch('q'),
      sources: user.id !== 0 ? user.sources.map(i => i.id).join(',') : watch('source').map(i => i.id).join(','),
      authors: user.id !== 0 ? user.authors.map(i => i.id).join(',') : watch('author').map(i => i.id).join(','),
      order: _.get(watch('sort'), 'id', 'desc'),
      skip: news.length
     }, makeAlert).then(res => {
      setNews([...news, ...res.data.news])
      setIsSubmitting(false)
    }).catch(err => {
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <Menu />
      <TopBox>
        <h1>Welcome to News Agency</h1>
        <p>
          Get top headlines from best news agencies all over the world.
          <br />
          Stay <span>updated</span>! Know <span>everything</span>, Become{' '}
          <span>mastermind</span>!
        </p>
      </TopBox>

      <Featured>
        <div className="img">
          <img src={'https://picsum.photos/500/300?random=1'} alt={'test'} />
        </div>

        <div className="info">
          <div className="author">
            <CAvatar src={'https://picsum.photos/50/50?random=2'} />
            <span>Reza Shams</span>
          </div>

          <div className="headline">
            <span>Welcome to News Agency Take Home Task.</span>
          </div>

          <div className="body">
            <p>
              This is a take home task build by me to demonstrate a veeeery tiny amount of my skills in full stack development. This task is for Innoscripta's recruitment process. Feel free to ask anything about the code including TypeScript, PHP, Laravel, React.js, and Docker. Looking forward to see you in person.
            </p>
          </div>

          <div className="source">
            <span>Reza Shams</span>
          </div>
        </div>
      </Featured>

      <Title>
        <h5>Top Feed</h5>
      </Title>

      <NewsSection>
        <div className='filter'>
          <form id='search' onSubmit={handleSubmit(onSubmit)}>
            <div className='search'>
              <ControllerTextField
                label={'Search'}
                placeholder={'Your Keywork'}
                controllerName={'q'}
                controllerInstance={control}
                errors={errors}
              />
            </div>

            <div className='source'>
              <ControllerAutocomplete
                label={'Source'}
                controllerName={'source'}
                idKey='id'
                titleKey='title'
                controllerInstance={control}
                errors={errors}
                options={sources}
                setOptions={setSources}
                onSearchOpen={handleSourceSearch}
                multiple
                disabled={disabled}
              />
            </div>

            <div className='author'>
              <ControllerAutocomplete
                label={'Author'}
                controllerName={'author'}
                idKey='id'
                titleKey='title'
                controllerInstance={control}
                errors={errors}
                options={authors}
                setOptions={setAuthors}
                onSearchOpen={handleAuthorSearch}
                multiple
                disabled={disabled}
              />
            </div>

            <div className='sort'>
              <ControllerAutocomplete
                label={'Show Order'}
                controllerName={'sort'}
                idKey='id'
                titleKey='title'
                controllerInstance={control}
                errors={errors}
                options={[{ id: 'asc', title: 'Old to New' }, { id: 'desc', title: 'New to Old' }]}
                setOptions={() => {}}
                onSearchOpen={() => new Promise((resolve) => resolve(true))}
              />
            </div>

            <div className='grow' />

            <CButton
              type='submit'
              disabled={isSubmitting}
            >
              Filter
            </CButton>
          </form>
        </div>

        {isSubmitting ?
          <CLoader width={100} height={100} />
        :  null}

        <div className='boxes'>
          {news.map((article, i) => (
            <NewsBox key={article.id} article={article} />
          ))}
        </div>

        <CButton
          disabled={isSubmitting}
          loading={isSubmitting}
          onClick={loadMore}
          margin='40px auto 0 0'
        >
          Load More
        </CButton>
      </NewsSection>

      <Footer />
    </>
  )
}
