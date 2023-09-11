import React, { type ReactElement, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { CAutocomplete, CTextField, type CTextFieldPropType } from '../mui'

interface Props {
  controllerName: string
  controllerInstance: any
  controllerRules?: any
  idKey?: string
  titleKey?: string
  label: string
  errors: any
  onSearchOpen: (value: string) => Promise<boolean>
  onChange?: (value: any) => void
  options: any[]
  setOptions: any
  multiple?: boolean
  disabled?: boolean
}

export function ControllerAutocomplete (props: Props): ReactElement {
  const { disabled = false, idKey = 'id', titleKey = 'title', options, setOptions, multiple = false } = props

  const [open, setOpen] = useState(false)
  const [searchDone, setSearchDone] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const loading = open && !searchDone

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    if (active) {
      props.onSearchOpen(searchValue).then(result => {
        setSearchDone(result)
      }).catch(error => {
        setSearchDone(error)
      })
    }

    return () => {
      active = false
    }
  })

  useEffect(() => {
    if (!open) {
      setOptions([])
      setSearchDone(false)
    }
  }, [open])

  return (
    <Controller
      name={props.controllerName}
      control={props.controllerInstance}
      rules={props.controllerRules !== undefined ? props.controllerRules : undefined}
      render={({ field: { onChange, value } }) => (
        <CAutocomplete
          multiple={multiple}
          id={props.controllerName}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
            setSearchValue('')
          }}
          options={options}
          loading={loading}
          isOptionEqualToValue={(
            option: any,
            value: any
          ) => option[idKey] === value[titleKey]}
          getOptionLabel={(option) => option[titleKey]}
          onChange={(_event, value) => {
            onChange(value)

            if (props.onChange !== undefined && props.onChange !== null) {
              props.onChange(value)
            }

            setSearchValue('')
          }}
          onInputChange={(event, inputValue) => {
            if (event != null) {
              setSearchValue(inputValue)
              setSearchDone(false)
            }
          }}
          disabled={disabled}
          value={value !== undefined ? value : (multiple ? [] : null)}
          renderInput={({
            label,
            ...params
          }: JSX.IntrinsicAttributes & CTextFieldPropType) => {
            return (
              <CTextField
                id={props.controllerName}
                name={props.controllerName}
                type="text"
                label={props.label}
                helperText={props.errors[props.controllerName]?.message}
                {...params}
              />
            )
          }}
        />
      )}
    />
  )
}
