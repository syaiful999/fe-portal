import { authTypes } from '../types'
import { Queries, Mutations } from '../../graphql'
import moment from 'moment'

const authActions = {
  checkAuthentication: () => dispatch => {
    const isAuth = localStorage.getItem('auth') === 'true'
    const token = localStorage.getItem('token')
    const rememberMe = localStorage.getItem('rememberMe') === 'true'
    const user_photo_1 = localStorage.getItem('primary_user_photo')
    const user_photo_2 = localStorage.getItem('secondary_user_photo')
    const payload = { isAuth, token: token === null ? undefined : token, rememberMe, user_photo_1, user_photo_2 }
    dispatch({ type: authTypes.CHECK_AUTHENTICATION, payload })
    return payload
  },
  logout: () => dispatch => {
    return dispatch({ type: authTypes.LOGOUT })
  },
  logoutModalShow: (isLogoutModalShow) => dispatch => {
    return dispatch({ type: authTypes.SHOW_LOGOUT_MODAL, payload: { isLogoutModalShow } })
  },
  onChangeNIK: ({ client, nik }) => async dispatch => {
    const { data } = await client.query({
      query: Queries.auth.get_user_by_nik,
      fetchPolicy: 'no-cache',
      variables: {
        nik: nik
      }
    })
    if (data.get_user_by_nik.data.length > 0) {
      dispatch({ type: authTypes.CHANGE_EDIT_MODE, payload: { field: 'nik', value: nik } })
      return { isNone: false, data: data.get_user_by_nik.data }
    } else {
      return { isNone: true, data: null }
    }
  },
  login: ({ client, dataItem }) => async () => {
    try {
      const { data } = await client.query({
        query: Queries.auth.login,
        fetchPolicy: 'no-cache',
        variables: {
          username: dataItem.username,
          password: dataItem.password,
        }
      })
      if (data.loginPortal.authenticated) {
        localStorage.setItem('auth', 'true')
        localStorage.setItem('token', data.loginPortal.token)
        window.location.reload()
      } else {
        return { isError: true }
      }
      return { isError: false }
    } catch (e) {
      console.log(e)
      return { isError: true, message: e.toString() }
    }
  },
  onRegister:({ register }) => dispatch => {
    return dispatch({ type: authTypes.SHOW_REGISTER, payload: { register } })
  },
  onSubmit: ({ client, dataRegister }) => async () => {
    try {
      let variables = {}
      variables = {
        fullname: dataRegister.fullname,
        email: dataRegister.email,
        username: dataRegister.username,
        password: dataRegister.password,
        is_active: true,
        created_by: 1,
        created_date: moment().format(),
      }
      if (dataRegister.id) variables = { ...variables, id: dataRegister.id, modified_by: 1, modified_date: moment().format() }

      const mutation =  Mutations.register.create_portal_register
      await client.mutate({ mutation, variables })
      return { isErrorCreate: false }
    } catch (e) {
      console.log(e)
      return { isErrorCreate: true, message: e.toString() }
    }
  },
  onChangeField: ({ field, value }) => dispatch => {
    const payload = { field, value }
    dispatch({ type: authTypes.ON_CHANGE, payload })
  },
}

export default authActions