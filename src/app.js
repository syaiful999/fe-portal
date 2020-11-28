import React, { Fragment, Component } from 'react'
import propTypes from 'prop-types'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { login, error, register } from './routes/routes'
import ErrorBoundary from './components/error/error-boundary'
import MainApp from './routes'
import { connect } from 'react-redux'
import { authActions } from './redux/actions'

const RootRoute = ({ match }) => {
  return (
    <Fragment>
      <ErrorBoundary>
        <Switch>
          <Route path='/login' component={login} />
          <Route path='/register' component={register} />
          <Route path='/error' component={error} />
          <Route path={`${match.url}`} component={MainApp} />
        </Switch>
      </ErrorBoundary>
    </Fragment>
  )
}
class App extends Component {
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    this.props.checkAuthentication()
  }
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Route path='/' component={RootRoute} />
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  ...state.authReducer
})
const mapDispatchToProps = {
  checkAuthentication: authActions.checkAuthentication
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

RootRoute.propTypes = {
  match: propTypes.object
}
App.propTypes = {
  checkAuthentication: propTypes.func
}