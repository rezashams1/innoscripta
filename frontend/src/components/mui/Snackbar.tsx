import { Snackbar } from '@mui/material'
import styled from 'styled-components'
import React, { type ReactElement } from 'react'
import MuiAlert, { type AlertColor, type AlertProps } from '@mui/material/Alert'
import Slide, { type SlideProps } from '@mui/material/Slide'

export interface CSnackbarType {
  open: boolean
  handleClose: (status: boolean) => void
  severity: AlertColor | undefined
  label: string
}

export interface CSnackbarStyleType extends AlertProps {
  background: string
  textColor: string
}

const CSnackbarStyle = styled(Snackbar)``

const CMuiAlertStyle = styled(MuiAlert)<CSnackbarStyleType>`
  && {
    background: ${props => props.theme.white100};
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 15px 30px;
    border-left: 5px solid ${({ theme, background }) => theme[background]};
    position: relative;
  }

  && .MuiAlert-icon {
    color: ${props => props.theme.black80};
    display: none;
  }

  && .MuiAlert-action {
    padding: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    
    > .MuiButtonBase-root {
      border-radius: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      box-sizing: border-box;

      > svg {
        display: none;
        transform: scale(0.7);
      }
    }
  }

  && .MuiAlert-message {
    font-family: inherit;
    font-weight: 600;
    font-size: 15px;
    color: ${props => props.theme.black80};
    padding: 0 !important;
  }
`

const Alert = React.forwardRef<HTMLDivElement, CSnackbarStyleType>(function Alert (
  props,
  ref
) {
  return <CMuiAlertStyle elevation={6} ref={ref} variant="filled" {...props} />
})

function SlideTransition (props: SlideProps): ReactElement {
  return <Slide {...props} direction="up" />
}

export const CSnackbar: React.ComponentType<CSnackbarType> = (props: CSnackbarType) => {
  const { open, handleClose, severity, label } = props

  const handleSelfClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    handleClose(false)
  }

  let colors = { background: 'white100', textColor: 'black80' }

  if (severity === 'error') {
    colors = { background: 'red100', textColor: 'black80' }
  }

  if (severity === 'success') {
    colors = { background: 'blue100', textColor: 'black80' }
  }

  return (
    <CSnackbarStyle
      open={open}
      autoHideDuration={6000}
      onClose={handleSelfClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleSelfClose} severity={severity} {...colors}>
        {label}
      </Alert>
    </CSnackbarStyle>
  )
}
