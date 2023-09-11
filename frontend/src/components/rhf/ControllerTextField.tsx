import React, { type ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { CTextField, type CTextFieldPropType } from '../mui'

interface Props {
  controllerName: string
  controllerInstance: any
  controllerRules?: any
  errors: any
}

export function ControllerTextField (
  props: Omit<CTextFieldPropType, 'value' | 'onChange' | 'helperText'> & Props
): ReactElement {
  const { controllerName, controllerInstance, controllerRules, errors, ...other } = props

  return (
    <Controller
      name={controllerName}
      control={controllerInstance}
      rules={controllerRules}
      render={({ field: { onChange, value } }) => (
        <CTextField
          value={value !== undefined ? value : ''}
          onChange={onChange}
          helperText={errors[controllerName]?.message}
          {...other}
        />
      )}
    />
  )
}
