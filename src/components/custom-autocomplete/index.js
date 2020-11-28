import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import { isEmpty } from '../../utils/is-empty'
import { AutoComplete } from '@progress/kendo-react-dropdowns'

const CustomAutoComplete = ({ 
  value, 
  className, 
  onChange, 
  error, 
  label, 
  errorMessage, 
  data = [], 
  loading = false, 
  textField,
  onClose = () => {} 
}) => {
  return (
    <Fragment>
      <label hidden={isEmpty(label)}>
        <small>{label}</small>
      </label>
      <AutoComplete
        textField={textField}
        data={data}
        loading={loading}
        className={className + (error ? ' error-dropdown': '')}
        value={value}
        onChange={onChange}
        onClose={onClose}
      />
      <small className='error-label' hidden={!error || isEmpty(errorMessage)}>{errorMessage}</small>
    </Fragment>
  )
}
export default CustomAutoComplete
CustomAutoComplete.propTypes = {
  onChange:propTypes.func,
  value:propTypes.any,
  className:propTypes.string,
  error:propTypes.bool,
  label:propTypes.string,
  errorMessage:propTypes.string,
  data:propTypes.array,
  loading:propTypes.bool,
  textField:propTypes.string,
  onClose:propTypes.func  
}