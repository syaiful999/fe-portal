import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import propTypes from 'prop-types'

import { isEmpty } from '../../utils/is-empty'
import Warning from '../warning'
import LoginPage from './new-login'

import Background from '../../assets/img/login.jpg'
const LoginComponent = ({ isAuth }) => {
  if (isAuth) return <Redirect to='/' />
  const [warning, setWarning] = useState({
    show: !isEmpty(localStorage.getItem('force_logout')),
    message: 'An administrator was set a new role permission, please re login.',
    type: 'warning'
  })
  const closeWarning = () => {
    localStorage.removeItem('force_logout')
    setWarning({ show: false })
  }
  return (
    <Fragment>
      <Warning
        onClose={closeWarning}
        show={warning.show}
        type={warning.type}
      >
        <small>
          {warning.message}
        </small>
        <div className='mt-3 text-right'>
          <Button className='button-error' onClick={closeWarning}>
            <small>CLOSE</small>
          </Button>
        </div>
      </Warning>
      <div style={{ backgroundImage: `url(${Background})` }} className='page-header clear-filter' filter-color='blue'>
        <LoginPage />
      </div>
    </Fragment>
  )
}
const mapStateToProps = state => ({ ...state.authReducer })
export default connect(mapStateToProps)(LoginComponent)
LoginComponent.propTypes = {
  isAuth: propTypes.bool
}