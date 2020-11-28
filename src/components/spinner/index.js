import React from 'react'
import propTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'
import './style.css'
const SpinnerLoading = ({ loading }) => {
  return (
    <div hidden={!loading} style={{ position: 'absolute', zIndex: '5' }} className='loading'>
      <Spinner className='loading-spinner' animation='border' variant='danger' />
    </div>
  )
}
export default SpinnerLoading
SpinnerLoading.propTypes = {
  loading: propTypes.bool
}
SpinnerLoading.defaultProps = {
  loading: true
}