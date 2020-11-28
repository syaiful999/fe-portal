import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import './assets/css/all.css'
// import './assets/css/vendor/all.css'
import './assets/css/now-ui-kit.css'

import serviceWorker from './sw'
import App from './app'
import store from './redux/store'
import config from './config/config.json'
import getClientConfig from './graphql/config'
import axios from 'axios'

axios.interceptors.request.use(req => {
  req.headers.Authorization = 'Basic Zm1zX2FkbWluX3B5dGhvbl9zZXJ2aWNlX2RldjpmbXMuQGRtIW4uUEBzc3cwcmQucHl0aDBu'
  return req
}, error => {
  console.log(error)
  return Promise.reject(error)
})

const Root = () => {
  return (
    <Provider store={store(config.App.DEVELOPMENT)}>
      <ApolloProvider client={getClientConfig()}>
        <App />
      </ApolloProvider>
    </Provider>
  )
}
const element = document.getElementById('root')
render(<Root />, element)
serviceWorker()
