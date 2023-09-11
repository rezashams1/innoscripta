import { type AlertColor } from '@mui/material';
import React, { type ReactElement, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { CSnackbar } from './components/mui';
import { lightTheme, GlobalStyle } from './config/styled-components';
import { GlobalContext } from './contexts';
import Routes from './routes';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const App: React.FC = (): ReactElement => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [alert, setAlert] = useState<{
    type: AlertColor | undefined;
    message: string;
  }>({ message: '', type: 'success' });
  function makeAlert(type: AlertColor, message: string): void {
    setAlert({ type, message });
  }

  return (
    <GlobalContext.Provider
      value={{
        makeAlert
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle theme={lightTheme} />
        <Routes />
        <CSnackbar
          open={alert.message !== ''}
          handleClose={() => {
            makeAlert('success', '');
          }}
          severity={alert.type}
          label={alert.message}
        />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
