import React, { useState, Fragment, useEffect } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap'
// core components
import Visible from '@material-ui/icons/Visibility'
import Invisible from '@material-ui/icons/VisibilityOff'
import { useHistory } from 'react-router-dom'

import Spinner from '../../components/spinner'
import Warning from '../../components/warning'
import { connect } from 'react-redux'
import { authActions } from '../../redux/actions'
import propTypes from 'prop-types'
import { useApolloClient } from 'react-apollo'
import './style.css'
// import { App } from '../../config/config.json'

// import TransparentFooter from "components/Footers/TransparentFooter.js";

const RegisterPage = ({ login, dataRegister, onChange, createNewAccount }) => {
  const [fullNameFocus, setFullNameFocus] = useState(false)
  const [userNameFocus, setUserNameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const history = useHistory()
  const client = useApolloClient()
  const [passwordType, setPasswordType] = useState('password')
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState({ show: false, type: 'error', message: '' })

  const changeRoute = (path) => {
    console.log(path)
    history.push('/')
    history.push(path)
  }
  const onChangePasswordType = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }
  const onCloseWarning = () => setWarning({ show: false, type: 'error', message: '' })
  const createAccount = async () => {
    console.log('masuk')
    setLoading(true)
    const { isErrorCreate } = await createNewAccount({ client, dataRegister })
    if (isErrorCreate) {
      setWarning({ show: true, type: 'warning', message: 'Invalid Create Account' })
      setLoading(false)
    } else {
      await login({ client, dataItem: { username:dataRegister.username, password:dataRegister.password } })
      setLoading(false)
    }
  }
  const PasswordButton = () => {
    if (passwordType === 'password') return <i><Visible onClick={onChangePasswordType} /></i>
    return <Invisible onClick={onChangePasswordType} />
  }

  useEffect(() => {
    document.body.classList.add('login-page')
    document.body.classList.add('sidebar-collapse')
    document.documentElement.classList.remove('nav-open')
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    return function cleanup() {
      document.body.classList.remove('login-page')
      document.body.classList.remove('sidebar-collapse')
    }
  }, [])
  return (
    <Fragment>
      <Spinner loading={loading} />
      <Warning
        show={warning.show}
        type={warning.type}
        onClose={onCloseWarning}
      >
        <small>{warning.message}</small>
      </Warning>
      <div className='content register-form'>
        <Container>
          <h1>SIGN UP</h1>
          <Col className='ml-auto mr-auto' md='4'>
            <Card className='card-login card-plain'>
              <Form action='' className='form' method=''>
                <CardBody>
                  <InputGroup
                    className={
                      'no-border input-lg' + (fullNameFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <span className='k-icon k-i-user'></span>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Full Name'
                      type='text'
                      onFocus={() => setFullNameFocus(true)}
                      onBlur={() => setFullNameFocus(false)}
                      onChange={(e) => onChange({ field:'fullname', value:e.target.value })}
                      name='fullname'
                      value={dataRegister.fullname}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      'no-border input-lg' + (userNameFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <span className='k-icon k-i-myspace'></span>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='User Name'
                      type='text'
                      onFocus={() => setUserNameFocus(true)}
                      onBlur={() => setUserNameFocus(false)}
                      onChange={(e) => onChange({ field:'username', value:e.target.value })}
                      name='username'
                      value={dataRegister.username}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      'no-border input-lg' + (emailFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <span className='k-icon k-i-email'></span>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Email Address'
                      type='text'
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      onChange={(e) => onChange({ field:'email', value:e.target.value })}
                      name='emailadrres'
                      value={dataRegister.email}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      'no-border input-lg' +
                      (passwordFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='append'>
                      <InputGroupText style={{
                        cursor: 'pointer',
                        borderTopLeftRadius: 30, borderBottomLeftRadius: 30
                      }}>
                        <PasswordButton />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Password'
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      type={passwordType}
                      onChange={(e) => onChange({ field:'password', value:e.target.value })}
                      name='password'
                      value={dataRegister.password}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className='text-center'>
                  <Button
                    // disabled={!dataItem.password || !dataItem.username || !dataItem.fullname || !dataItem.email}
                    block
                    className='btn-round'
                    color='info'
                    onClick={() =>createAccount()}
                    size='lg'
                  >Create Account</Button>
                  <div className='pull-left'>
                    <h6
                      onClick={() => changeRoute('/login')}
                    >Have Account? Sign In
                    </h6>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
    </Fragment >
  )
}

const mapStateToProps = state => ({
  ...state.authReducer
})

const mapDispatchToProps = {
  login: authActions.login,
  onRegister: authActions.onRegister,
  onChange: authActions.onChangeField,
  createNewAccount: authActions.onSubmit
}

RegisterPage.propTypes = {
  login: propTypes.func,
  onRegister: propTypes.func,
  dataRegister: propTypes.object,
  onChange: propTypes.func,
  dataItem: propTypes.object,
  createNewAccount: propTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
