import { createGlobalStyle, type DefaultTheme } from 'styled-components'

interface ThemeType extends DefaultTheme {
  white100: string
  black3: string
  black5: string
  black8: string
  black12: string
  black20: string
  black30: string
  black40: string
  black50: string
  black60: string
  black70: string
  black80: string
  black100: string
  lightBlue10: string
  lightBlue20: string
  lightBlue40: string
  lightBlue60: string
  lightBlue80: string
  lightBlue100: string
  red10: string
  red20: string
  red30: string
  red40: string
  red50: string
  red60: string
  red70: string
  red80: string
  red90: string
  red100: string
  red110: string
  red120: string
  red130: string
  blue10: string
  blue20: string
  blue30: string
  blue40: string
  blue50: string
  blue60: string
  blue70: string
  blue80: string
  blue90: string
  blue100: string
  blue110: string
  blue120: string
  blue130: string
  navy5: string
  navy25: string
  navy50: string
  navy100: string
  darkBlue20: string
  darkBlue80: string
  darkBlue90: string
  darkBlue100: string
}

export const lightTheme = {
  white100: '#FFFFFF',

  black3: '#F7F7F7',
  black5: '#F2F2F2',
  black8: '#EBEBEB',
  black12: '#E0E0E0',
  black20: '#CCCCCC',
  black30: '#B3B3B3',
  black40: '#999999',
  black50: '#808080',
  black60: '#666666',
  black70: '#4C4C4C',
  black80: '#333333',
  black100: '#212121',

  lightBlue10: '#FBFDFE',
  lightBlue20: '#F5F9FD',
  lightBlue40: '#ECF4FC',
  lightBlue60: '#D9E9F8',
  lightBlue80: '#CAE0F5',
  lightBlue100: '#BCD8F3',

  red10: '#FBF1F2',
  red20: '#F5D9DB',
  red30: '#EEBEC1',
  red40: '#E7A4A9',
  red50: '#E28E95',
  red60: '#DC7A81',
  red70: '#D6636B',
  red80: '#CF4953',
  red90: '#CA343F',
  red100: '#C31C28',
  red110: '#B01924',
  red120: '#9C1620',
  red130: '#88141C',

  blue10: '#F5F8FB',
  blue20: '#DEE9F1',
  blue30: '#C6D9E7',
  blue40: '#B0CADD',
  blue50: '#99BAD4',
  blue60: '#81AACA',
  blue70: '#6A9BC0',
  blue80: '#538BB6',
  blue90: '#3C7CAC',
  blue100: '#236BA2',
  blue110: '#2B6896',
  blue120: '#265D86',
  blue130: '#225175',

  navy5: '#F3F4F6',
  navy25: '#C1C6CF',
  navy50: '#828C9F',
  navy100: '#061A40',

  darkBlue20: '#C1CED7',
  darkBlue80: '#436A85',
  darkBlue90: '#275472',
  darkBlue100: '#003559',
}

const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '650px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const devices = {
  mobileS: `(max-width: ${sizes.mobileS})`,
  mobileM: `(max-width: ${sizes.mobileM})`,
  mobileL: `(max-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
  desktop: `(max-width: ${sizes.desktop})`
}

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  html {
    overflow-x: hidden;
  }
  body {
    direction: ${props => props.theme.dir};
    overflow-x: hidden;
    position: relative;
    margin: 0;
    font-family: "Roboto", sans-serif;

     & *:not(.material-symbols-outlined) {
      font-family: "Roboto", sans-serif;
    }

    &.boxed {
      background-color: ${({ theme }) => theme.black5};
    }

    > * {
      transition: all ease-in-out 50ms !important;
      
      &:hover {
        transition: all ease-in-out 50ms !important;
      }
    }

    & a {
      text-decoration: none;
    }

    & .MuiPopover-paper {
      border-radius: 8px !important;
      background: ${props => props.theme.white100} !important;
      box-shadow: 0 10px 20px 0 rgb(0 0 0 / 5%);
      
      & .MuiMenuItem-root {
        font-family: inherit !important;
        color: ${props => props.theme.black80};
      }
    }

    & .MuiAutocomplete-popper {
      > div {
        border-radius: 8px !important;
        background: ${props => props.theme.white100} !important;
        color: ${props => props.theme.black80} !important;
      }
    }
  }

  .MuiTooltip-tooltip {
    
  }

  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
  }
  .material-symbols-outlined.filled {
    font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
  }

  /* slideTransition.scss */

  .fade-enter > .container {
    opacity: 0;
    transform: translate(25px, 0);
    z-index: 1;
  }
  .fade-enter.fade-enter-active > .container {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity 80ms ease-out, transform 100ms ease;
  }
  .fade-exit > .container {
    opacity: 1;
    transform: translate(0, 0);
  }
  .fade-exit.fade-exit-active > .container {
    opacity: 0;
    transform: translate(30px, 0);
    transition: opacity 80ms ease-out, transform 100ms ease;
  }

  /* Works for Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Works for Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-background-clip: text;
      -webkit-text-fill-color: ${props => props.theme.black80};
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: none;
  }

  & .MuiDrawer-modal {
    z-index: 1301 !important;
  }
`
