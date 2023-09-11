import { Avatar, AvatarGroup } from '@mui/material'
import styled from 'styled-components'

export const CAvatar = styled(Avatar) <{ $size?: 'sm' | 'md' | 'lg' }>`
  && {
    background-color: ${props => props.theme.black30};
    color: ${props => props.theme.white100};
  }
`

export const CAvatarGroup = styled(AvatarGroup) <{ $size?: 'sm' | 'md' | 'lg' }>`
  && {
    > .MuiAvatarGroup-avatar {
        background-color: ${props => props.theme.black30};
        color: ${props => props.theme.white100};
    }

    > .MuiAvatar-root {
        width: ${props => props.$size === 'sm' ? '18px' : (props.$size === 'lg' ? '32px' : '24px')};
        height: ${props => props.$size === 'sm' ? '18px' : (props.$size === 'lg' ? '32px' : '24px')};
        font-size: ${props => props.$size === 'sm' ? '10px' : (props.$size === 'lg' ? '16px' : '12px')};
    }
  }
`
