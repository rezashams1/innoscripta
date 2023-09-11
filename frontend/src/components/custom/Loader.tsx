import styled from 'styled-components'
import { ThreeDots } from 'react-loader-spinner'
import React from 'react'

export interface CLoaderType {
  width: number
  height: number
  central?: boolean
  margin?: string
}

const Wrapper = styled.div<{ $margin: string }>`
  > div {
    > svg {
      fill: ${({ theme }) => theme.blue100} !important;
      color: ${({ theme }) => theme.blue100} !important;
      margin: ${({ $margin }) => $margin};
      display: block;
    }
  }
`

const TheLoader = styled(ThreeDots)`
  && {
    margin-left: auto;
    margin-right: auto;
  }
`

const CentralBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const CLoader: React.ComponentType<CLoaderType> = (props: CLoaderType) => {
  const { width = 80, height = 80, central = false, margin = '0 auto' } = props

  return central
    ? (
    <CentralBox>
      <Wrapper $margin={margin}><TheLoader height={height} width={width} visible={true} /></Wrapper>
    </CentralBox>
      )
    : (
    <Wrapper $margin={margin}><TheLoader height={height} width={width} visible={true} /></Wrapper>
      )
}
