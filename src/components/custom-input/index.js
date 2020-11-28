import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import { Input } from 'reactstrap'
import { isEmpty } from '../../utils/is-empty'

const CustomInput = ({ value, className, onChange, error, label, errorMessage, disabled = false, type = 'text',placeholder,id }) => {
  return (
    <Fragment>
      <label hidden={isEmpty(label)}>
        <small>{label}</small>
      </label>
      <Input
        type={type}
        disabled={disabled}
        className={className + (error ? ' error-input' : '')}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
      />
      <small className='error-label' hidden={!error || isEmpty(errorMessage)}>{errorMessage}</small>
    </Fragment>
  )
}
export default CustomInput
CustomInput.propTypes = {
  onChange: propTypes.func,
  value: propTypes.string,
  className: propTypes.string,
  error: propTypes.bool,
  label: propTypes.string,
  errorMessage: propTypes.string,
  disabled: propTypes.bool,
  defaultValue: propTypes.string,
  type: propTypes.string,
  placeholder:propTypes.string,
  id:propTypes.string
}