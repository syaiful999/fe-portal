import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
// import { Button, Row } from 'reactstrap'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { authActions } from '../redux/actions'
import { MainRoutesComponent, dashboard } from './routes'
// import Warning from '../components/warning'
import ExamplesNavbar from '../components/navbar'

const MainRoutes = ({
  isAuth,
  location,
  // isLogoutModalShow,
  // logoutModalShow,
  // logout
}) => {
  // const onLogout = () => {
  //   localStorage.clear()
  //   logout()
  // }
  // if (!isAuth && location.pathname === '/streaming') return <Redirect to='/login' />
  return (
    <Fragment>
      <ExamplesNavbar />
      <div>
        <Switch>
          <Route path='/dashboard' component={dashboard} />
          <MainRoutesComponent location={location} />
        </Switch>
      </div>
    </Fragment >
  )
}
const mapStateToProps = state => ({
  ...state.authReducer
})
const mapDispatchToProps = {
  logoutModalShow: authActions.logoutModalShow,
  logout: authActions.logout,

}
export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes)
MainRoutes.propTypes = {
  isAuth: propTypes.bool,
  location: propTypes.object,
  isLogoutModalShow: propTypes.bool,
  logoutModalShow: propTypes.func,
  logout: propTypes.func
}