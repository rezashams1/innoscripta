import { Grid } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  ControllerAutocomplete,
} from '../../components/rhf';
import { CButton } from '../../components/mui';
import { NewsService, UserService } from '../../services';
import { useGlobalContext } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { set, logout as setLogout } from '../../redux/slices/user';
import cookies from 'js-cookie';
import { Footer, Menu } from '../../components/custom';
import { Author, Source } from '../../interfaces/news';

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
`;

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
`;

const Preferences = styled.section`
  width: 95%;
  max-width: 1440px;
  margin: 40px auto 0 auto;
  box-sizing: border-box;

  > form {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    > .source,
    .author {
      width: 300px;
      margin-right: 20px;
    }

    > .grow {
      flex-grow: 1;
    }
  }
`;

interface Inputs {
  authors: Author[];
  sources: Source[];
}

export const ProfilePage: React.FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Profile';

    return () => {
      document.title = '';
    };
  }, []);

  const user = useAppSelector((state) => state.user);
  const { makeAlert } = useGlobalContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Inputs>({
    defaultValues: {
      authors: user.authors,
      sources: user.sources
    }
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [sources, setSources] = useState<Source[]>([]);
  const handleSourceSearch = async (searchValue: string): Promise<boolean> => {
    try {
      const search = await NewsService.sources(searchValue, makeAlert);
      setSources(search.data.sources);
    } catch (err) {
      setSources([]);
    }

    return true;
  };

  const [authors, setAuthors] = useState<Author[]>([]);
  const handleAuthorSearch = async (searchValue: string): Promise<boolean> => {
    try {
      const search = await NewsService.authors(searchValue, makeAlert);
      setAuthors(search.data.authors);
    } catch (err) {
      setAuthors([]);
    }

    return true;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);

    if (isValid) {
      UserService.setPreferences(
        {
          sources: data.sources.map((i) => i.id),
          authors: data.authors.map((i) => i.id)
        },
        makeAlert
      )
        .then((res) => {
          dispatch(
            set({ ...user, sources: data.sources, authors: data.authors })
          );
          makeAlert('success', 'Preferences set successfully')
          setIsSubmitting(false);
        })
        .catch((err) => {
          setIsSubmitting(false);
        });
    }
  };

  const logout = () => {
    cookies.remove('auth')
    dispatch(setLogout())
    navigate('/')
    makeAlert('success', 'Logged Out')
  };

  return (
    <>
      <Menu />

      <TopBox>
        <h1>Welcome Back</h1>
        <p>{user.name}</p>
      </TopBox>

      <Title>
        <h5>Preferences</h5>
      </Title>

      <Preferences>
        <form id="search" onSubmit={handleSubmit(onSubmit)}>
          <div className="source">
            <ControllerAutocomplete
              label={'Sources'}
              controllerName={'sources'}
              idKey="id"
              titleKey="title"
              controllerInstance={control}
              errors={errors}
              options={sources}
              setOptions={setSources}
              onSearchOpen={handleSourceSearch}
              multiple
            />
          </div>

          <div className="author">
            <ControllerAutocomplete
              label={'Authors'}
              controllerName={'authors'}
              idKey="id"
              titleKey="title"
              controllerInstance={control}
              errors={errors}
              options={authors}
              setOptions={setAuthors}
              onSearchOpen={handleAuthorSearch}
              multiple
            />
          </div>

          <div className="grow" />

          <CButton type="submit" disabled={isSubmitting}>
            Save Preferences
          </CButton>
        </form>

        <Grid container>
          <Grid item md={10}></Grid>
          <Grid item md={2}>
            <CButton
              background="red100"
              backgroundHover="red110"
              onClick={logout}
              fullWidth
            >
              Log Out
            </CButton>
          </Grid>
        </Grid>
      </Preferences>

      <Footer />
    </>
  );
};
