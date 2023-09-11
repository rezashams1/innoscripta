import React, { type ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { CCheckbox, type CCheckboxPropTypes } from '../mui'

interface Props {
  controllerName: string
  controllerInstance: any
  controllerRules?: any
  errors: any
}

export function ControllerCheckbox (
  props: Omit<CCheckboxPropTypes, 'value' | 'onChange' | 'helperText'> & Props
): ReactElement {
  const { controllerName, controllerInstance, controllerRules, errors, ...other } = props

  return (
    <Controller
      name={controllerName}
      control={controllerInstance}
      rules={controllerRules}
      render={({ field: { onChange, value } }) => (
        <CCheckbox
          checked={value !== undefined ? value : false}
          onChange={onChange}
          helperText={errors[controllerName]?.message}
          {...other}
        />
      )}
    />
  )
}
