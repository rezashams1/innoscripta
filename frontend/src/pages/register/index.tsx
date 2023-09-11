import { Grid } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ControllerTextField } from '../../components/rhf';
import { CButton } from '../../components/mui';
import { AuthService } from '../../services';
import { useGlobalContext } from '../../contexts';
import { useAppDispatch } from '../../redux/hooks';
import { set } from '../../redux/slices/user';
import cookies from 'js-cookie';

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;

  > .box {
    width: 700px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.white100};
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-auto-rows: 1fr;
    direction: ${(props) => props.theme.dir};

    > .logo {
      background: ${(props) => props.theme.white100};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;

      > a {
        font-size: 24px;
        font-weight: 800;
        color: ${(props) => props.theme.red100};
      }
    }

    > .form {
      padding: 25px;

      > .tos {
        font-size: 12px;
        font-weight: 400;
        color: ${(props) => props.theme.black80};
        margin-top: 25px;

        > a {
          color: ${(props) => props.theme.red100};
        }
      }

      > .header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        > .button {
          margin-left: ${(props) => (props.theme.dir === 'rtl' ? '15px' : '0')};
          margin-right: ${(props) =>
            props.theme.dir === 'rtl' ? '0' : '15px'};
          transform: ${(props) =>
            props.theme.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'};

          > a {
            text-decoration: none;
          }
        }

        > .title {
          flex-grow: 1;

          > * {
            text-align: ${(props) =>
              props.theme.dir === 'rtl' ? 'right' : 'left'};
          }
        }
      }
    }
  }
`;

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = (): ReactElement => {
  useEffect(() => {
    document.body.classList.add('boxed');
    document.title = 'Register';

    return () => {
      document.body.classList.remove('boxed');
      document.title = '';
    };
  }, []);

  const { makeAlert } = useGlobalContext()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isValid }
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);

    if (isValid) {
        AuthService.register(data, setError, makeAlert).then(res => {
            cookies.set('auth', res.data.accessToken)
            dispatch(set({...res.data.user, sources: [], authors: []}))
            navigate('/')
            makeAlert('success', res.message)
            reset()
        }).catch(err => {
            setIsSubmitting(false)
        })
    }
  };

  return (
    <Box>
      <div className={'box'}>
        <div className="logo">
          <Link to="/">News Agency</Link>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="header"></div>

          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
              <ControllerTextField
                controllerInstance={control}
                controllerName="name"
                errors={errors}
                disabled={isSubmitting}
                label={'Full Name'}
                placeholder={'Reza Shams'}
                controllerRules={{
                  required: {
                    value: true,
                    message: 'Full name is required'
                  }
                }}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <ControllerTextField
                controllerInstance={control}
                controllerName="email"
                errors={errors}
                label={'Email Address'}
                placeholder="reza@shams.com"
                controllerRules={{
                  required: {
                    value: true,
                    message: 'Email address is required'
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email address is not valid'
                  }
                }}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <ControllerTextField
                controllerInstance={control}
                controllerName="password"
                errors={errors}
                disabled={isSubmitting}
                label={'Password'}
                placeholder="MyStrongPassword"
                type="password"
                controllerRules={{
                  required: {
                    value: true,
                    message: 'Password is required'
                  }
                }}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <ControllerTextField
                controllerInstance={control}
                controllerName="confirmPassword"
                errors={errors}
                disabled={isSubmitting}
                label={'Confirm Password'}
                placeholder="MyStrongPassword"
                type="password"
                controllerRules={{
                  required: {
                    value: true,
                    message: 'Confirm password is required'
                  },
                  validate: (value: string) =>
                    value === watch('password') || 'Passwords do not match'
                }}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <CButton
                fullWidth
                type="submit"
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
              >
                Register
              </CButton>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <Link to="/login">
                <CButton
                  fullWidth
                  type="submit"
                  background="white100"
                  backgroundHover="black3"
                  backgroundDisabled="black3"
                  color="black80"
                >
                  Already Have Account? Log in.
                </CButton>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};
