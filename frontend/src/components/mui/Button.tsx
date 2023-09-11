import { Button } from '@mui/material'
import styled from 'styled-components'
import React from 'react'
import { CLoader } from '../custom'

export interface CButtonType {
  children: any
  color?: string
  background?: string
  backgroundHover?: string
  backgroundDisabled?: string
  variant?: 'outlined' | 'filled'
  fullWidth?: boolean
  type?: 'submit' | 'button'
  size?: 's' | 'm' | 'l'
  loading?: boolean
  disabled?: boolean
  margin?: string
  onClick?: () => void
  form?: string
  startIcon?: string
  className?: string
}

export interface StyledButtonType {
  $background: string
  $backgroundHover: string
  $backgroundDisabled: string
  $color: string
  variant: 'outlined' | 'filled'
  $fullWidth: boolean
  size: 's' | 'm' | 'l'
  $margin: string
  disableRipple: boolean
}

const TmpButton: React.ComponentType<any> = (props) => {
  return (<Button {...props} />)
}

const CButtonStyle = styled(TmpButton) <StyledButtonType>`
  && {
    box-shadow: none;
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    background: ${({ theme, $background, variant }) => variant === 'outlined' ? 'transparent' : theme[$background]};
    color: ${({ theme, $color }) => theme[$color]};
    border-radius: 8px;
    border: 1px solid ${({ theme, $background }) => theme[$background]};
    transition: all 50ms ease-in-out;
    width: ${({ $fullWidth }) => $fullWidth === true ? '100%' : 'auto'};
    padding: ${({ size }) => size === 's' ? '5px 15px' : (size === 'l' ? '15px 25px' : '10px 15px')};
    margin: ${({ $margin }) => $margin};

    & svg {
      width: 18px;
      fill: ${({ theme, $color }) => theme[$color]} !important;
    }
    
    > .MuiButton-startIcon {
      margin-left: 0; 
      margin-right: 15px;
    }

    &:hover {
      background: ${({ theme, $backgroundHover }) => theme[$backgroundHover]};
      transition: all 50ms ease-in-out;
      color: ${({ theme, $color }) => theme[$color]};
      border-color: ${({ theme, $background, $backgroundHover, variant }) => variant === 'outlined' ? theme[$background] : theme[$backgroundHover]};

      & svg {
        fill: ${({ theme, $color }) => theme[$color]} !important;
      }
    }

    > .loader {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }

  &&.Mui-disabled {
    background: ${({ theme, $backgroundDisabled }) => theme[$backgroundDisabled]};
    border: 1px solid ${({ theme, $backgroundDisabled }) => theme[$backgroundDisabled]};

    &:hover {
      cursor: not-allowed;
    }
  }
`

export const CButton: React.ComponentType<CButtonType> = (props: CButtonType) => {
  const {
    loading = false,
    disabled = false,
    margin = '0',
    variant = 'filled',
    fullWidth = false,
    type = 'button',
    size = 'm',
    color = 'white100',
    background = 'blue100',
    backgroundHover = 'blue80',
    backgroundDisabled = 'blue60',
    startIcon,
    className = '',
    ...other
  } = props

  return (
    <CButtonStyle
      size={size}
      disabled={disabled}
      disableRipple={true}
      $margin={margin}
      variant={variant}
      $fullWidth={fullWidth}
      type={type}
      $color={color}
      $background={background}
      $backgroundHover={backgroundHover}
      $backgroundDisabled={backgroundDisabled}
      startIcon={startIcon != null ? <span className='material-symbols-outlined'>{startIcon}</span> : null}
      className={className}
      {...other}
    >
      {props.children}

      {loading
        ? <div className='loader'><CLoader width={30} height={24} /></div>
        : null
      }
    </CButtonStyle>
  )
}
