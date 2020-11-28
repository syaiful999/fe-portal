import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import propTypes from 'prop-types'

import Spinner from '../components/spinner'

const Loading = () => <Spinner loading={true} />

const login = Loadable({
  loader: () => import('../components/login'),
  loading: Loading,
})
const error = Loadable({
  loader: () => import('../components/error/404'),
  loading: Loading,
})
const dashboard = Loadable({
  loader: () => import('./dashboard'),
  loading: Loading,
})
const Streaming = Loadable({
  loader: () => import('./video-streaming'),
  loading: Loading,
})
const register = Loadable({
  loader: () => import('../components/register'),
  loading: Loading,
})
const MainRoutesComponent = ({ location }) => {
  if (location.pathname === '/') return <Redirect to='/dashboard' />

  return (
    <Switch>
      <Route path='/streaming' component={Streaming} />
      <Route path='/register' component={register} />
      <Redirect to='/error' />
    </Switch>
  )
}

export { login, error, dashboard, MainRoutesComponent, register }
MainRoutesComponent.propTypes = {
  location: propTypes.object,
  modulePermission: propTypes.object
}
