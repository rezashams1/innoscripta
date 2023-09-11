import { Autocomplete, type AutocompleteCloseReason, Paper } from '@mui/material'
import styled from 'styled-components'
import React, { type HTMLAttributes, type ReactElement, type SyntheticEvent } from 'react'

const CAutocompleteStyle = styled(Autocomplete)`
  && .MuiAutocomplete-inputRoot {
    padding-right: 39px !important; 
    padding-left: 8px;
  }

  && .MuiAutocomplete-endAdornment {
    right: 9px !important; 
    left: auto !important;
  }

  && .MuiSvgIcon-root {
    color: ${({ theme }) => theme.placeholder};
  }

  && .MuiChip-root {
    background-color: ${({ theme }) => theme.body};
    height: 20px;
    padding-top: 2px;
    padding-bottom: 2px;

    > .MuiChip-label {
      font-family: inherit;
      font-size: 10px;
      font-weight: 300;
      color: ${({ theme }) => theme.text};
    }

    > svg {
      right: auto; 
      left: 7px; 
      margin-left: -6px; 
      margin-right: 5px;
      fill: ${({ theme }) => theme.text};
      font-size: 16px;
    }

    &:first-child {
      margin-left: 0;
    }
  }
`

const CPaperStyle = styled(Paper)`
  && {
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    background: ${({ theme }) => theme.body};
    border-radius: 15px;
    margin-top: 10px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }

  && .MuiAutocomplete-loading,
  && .MuiAutocomplete-noOptions {
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }
`

interface Props {
  id: string
  options: Object[]
  renderInput: any
  open: boolean
  loading: boolean
  multiple?: boolean
  freeSolo?: boolean
  autoSelect?: boolean
  disabled?: boolean
  onOpen: (event: SyntheticEvent<Element, Event>) => void
  onClose: (
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteCloseReason
  ) => void
  isOptionEqualToValue: (option: any, value: any) => boolean
  onChange: (event: any, value: any) => void
  onInputChange?: (event: any, inputValue: string) => void
  getOptionLabel: (option: any) => string
  defaultValue?: any
  value?: any
  inputValue?: any
}

function CPaper (props: HTMLAttributes<HTMLElement>): ReactElement {
  const { children, ...other } = props

  return <CPaperStyle {...other}>{children}</CPaperStyle>
}

export function CAutocomplete (props: Props): ReactElement {
  const { id, options, renderInput, ...other } = props

  return (
    <CAutocompleteStyle
      disablePortal
      id={id}
      options={options}
      loadingText={'Searching'}
      noOptionsText={'No Item Found'}
      renderInput={renderInput}
      PaperComponent={CPaper}
      {...other}
    />
  )
}
