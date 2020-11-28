import jwt from 'jsonwebtoken'
import { authTypes } from '../types'
import { GRAPHQL } from '../../config/config.json'

const inititalState = {
  isAuth: false,
  token: undefined,
  rememberMe: false,
  user_photo_1: '',
  user_photo_2: '',
  isLogoutModalShow: false,
  dataUser: {},
  register: false,
  dataItem:1,
  dataRegister:{
    inEdit: false,
    inView: false,
    inHistory: false,
    inCheckout: false,
    fullname:''
  }
}

const decryptor = data => jwt.verify(data, GRAPHQL.API_TOKEN_SECRET_KEY, (_, decoded) => decoded)

const authReducer = (state = { ...inititalState }, action) => {
  switch (action.type) {
    case authTypes.CHECK_AUTHENTICATION: {
      const { isAuth, token, rememberMe, user_photo_1, user_photo_2 } = action.payload
      const dataUser = decryptor(token)
      return { isAuth:isAuth, token:token, rememberMe:rememberMe, dataUser:dataUser, user_photo_1:user_photo_1, user_photo_2:user_photo_2, dataRegister:{ ...state.dataRegister } }
    }
    case authTypes.LOGOUT: {
      const token = state.rememberMe ? state.token : undefined
      return { ...state, isAuth: false, token }
    }
    case authTypes.SHOW_LOGOUT_MODAL: {
      const { isLogoutModalShow } = action.payload
      return { ...state, isLogoutModalShow }
    }
    case authTypes.CHANGE_EDIT_MODE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataItem: {
          ...state.dataItem,
          [field]: value
        }
      }
    }
    case authTypes.SHOW_REGISTER: {
      const { register } = action.payload
      return {
        ...state,
        register
      }
    }
    case authTypes.ON_CHANGE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataRegister: {
          ...state.dataRegister,
          [field]: value
        }
      }
    }
    default:
      return { ...state }
  }
}
export default authReducer
