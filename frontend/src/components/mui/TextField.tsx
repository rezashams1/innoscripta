import { TextField } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import * as NumberFormat from 'react-number-format';

export interface CTextFieldPropType {
  direction?: 'right' | 'left';
  labelDirection?: 'right' | 'left';
  labelDirectionOverride?: boolean;
  label: string;
  placeholder: string;
  value?: any;
  defaultValue?: any;
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'file';
  helperText?: string;
  hasError?: boolean;
  background?: string;
  multiline?: boolean;
  marginBottom?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputRef?: any;
  onKeyDown?: (event: any) => void;
  rows?: number;
  disabled?: boolean;
  errorPlacement?: 'top' | 'right' | 'bottom' | 'left';
  InputProps?: any;
}

interface CTextFieldStyleType {
  $marginBottom: string;
  $background?: string | null;
  $direction?: 'left' | 'right';
  $labelDirection?: 'left' | 'right';
  $labelDirectionOverride?: boolean;
}

export const CTextFieldStyle = styled(TextField)<CTextFieldStyleType>`
  && {
    font-family: inherit;
    margin-bottom: ${(props) => `${props.$marginBottom}`};
    border-radius: 12px;
  }

  && .MuiInputBase-root {
    background: ${({ theme, $background }) =>
      $background != null ? theme[$background] : theme.black3};
    border: 1px solid ${({ theme }) => theme.black12};
    border-radius: 8px;
    font-family: inherit;

    &:before,
    &:after {
      display: none;
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.black80};
    }

    &.Mui-error {
      border: 1px solid ${({ theme }) => theme.red100};
    }

    &.Mui-focused {
      border: 1px solid ${({ theme }) => theme.black80};
    }

    &.Mui-disabled {
      opacity: 0.5;
    }
  }

  && .MuiInputBase-input {
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: ${({ $direction, theme }) =>
      $direction === 'left' ? 'left' : 'right'};
    direction: ${({ $direction, theme }) =>
      $direction === 'left' ? 'ltr' : 'rtl'};
    color: ${({ theme }) => theme.black80};

    &.Mui-disabled {
      color: ${({ theme }) => theme.black50} !important;
      -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
    }

    &:-internal-autofill-selected {
      appearance: menulist-button;
      background-image: none !important;
      background-color: ${({ theme }) => theme.black3} !important;
      color: ${({ theme }) => theme.black80} !important;
      border-radius: 12px !important;
    }
  }

  && .MuiInputLabel-root {
    color: ${({ theme }) => theme.black50};
    left: ${({ $labelDirection, theme }) =>
      $labelDirection === 'left' ? 0 : 'auto'};
    right: ${({ $labelDirection, theme }) =>
      $labelDirection === 'left' ? 'auto' : 0};
    transform-origin: ${({ $labelDirection, theme }) =>
      $labelDirection === 'left' ? 'top left' : 'top right'};
    transform: ${({ $labelDirection, theme }) =>
      $labelDirection === 'left'
        ? 'translate(12px, 19px) scale(1)'
        : 'translate(-12px, 16px) scale(1)'};
    font-family: 'Roboto';
    font-size: 14px;

    &.Mui-focused {
      color: ${({ theme }) => theme.black80};
    }
  }

  && .MuiInputLabel-root.Mui-focused,
  && .MuiInputLabel-root.MuiInputLabel-shrink {
    transform: ${({ $labelDirection, theme }) =>
      $labelDirection === 'left'
        ? 'translate(12px, 7px) scale(0.75)'
        : 'translate(-12px, 7px) scale(0.75)'};
  }

  && .MuiFormHelperText-root {
    text-align: right;
    font-family: inherit;
    font-weight: 500;
    font-size: 10px;
    color: ${({ theme }) => theme.red100};
    margin-right: 8px;
    margin-top: 8px;
  }

  && .MuiSvgIcon-root {
    right: auto;
    left: 8px;
    color: ${({ theme }) => theme.black50};
  }

  && .MuiNativeSelect-select,
  && .MuiSelect-select {
    padding-right: 12px !important;
    padding-left: 32px !important;
  }
`;

export const CNumberFormat = React.forwardRef(function NumberFormatCustom(
  props: { onChange: (value: any) => void },
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat.NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: any) => {
        onChange(values.value);
      }}
      thousandSeparator
      valueIsNumericString
      prefix=""
    />
  );
});

export const CTextField: React.ComponentType<CTextFieldPropType> = (
  props: CTextFieldPropType
) => {
  const {
    hasError = false,
    marginBottom = '0',
    direction = 'left',
    labelDirection = 'left',
    labelDirectionOverride = true,
    disabled = false,
    helperText,
    ...other
  } = props;

  return (
    <CTextFieldStyle
      fullWidth
      error={
        helperText != null
          ? helperText.length > 0 && helperText !== ''
          : hasError
      }
      variant="filled"
      $marginBottom={marginBottom}
      $direction={direction}
      $labelDirection={labelDirection}
      $labelDirectionOverride={labelDirectionOverride}
      disabled={disabled}
      helperText={helperText}
      {...other}
    />
  );
};
