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

const LoginPage = ({ login }) => {
  const [firstFocus, setFirstFocus] = useState(false)
  const [lastFocus, setLastFocus] = useState(false)
  const history = useHistory()
  const client = useApolloClient()

  const [state, setState] = useState({ username: '', password: '' })
  const [passwordType, setPasswordType] = useState('password')
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState({ show: false, type: 'error', message: '' })
  const changeRoute = (path) => {
    console.log(path)
    history.push('/')
    history.push(path)
  }
  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onChangePasswordType = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }
  const onCloseWarning = () => setWarning({ show: false, type: 'error', message: '' })
  const signIn = async () => {
    setLoading(true)
    const { username, password } = state
    const { isError } = await login({ client, dataItem: { username, password } })
    if (isError) {
      setWarning({ show: true, type: 'warning', message: 'Invalid Username or Password' })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }
  const PasswordButton = () => {
    if (passwordType === 'password') return <i><Visible onClick={onChangePasswordType} /></i>
    return <Invisible onClick={onChangePasswordType} />
  }
  const onForgotPassword = () => setWarning({ show: true, type: 'warning', message: 'Please contact your Super Administrator to reset your password ' })

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
      <div className='content login-form'>
        <Container>
          <h1>SIGN IN</h1>
          <Col className='ml-auto mr-auto' md='4'>
            <Card className='card-login card-plain'>
              <Form action='' className='form' method=''>
                <CardBody>
                  <InputGroup
                    className={
                      'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <span className='k-icon k-i-user'></span>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Username'
                      type='text'
                      style={{ fontSize: 'large' }}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={onChange}
                      name='username'
                      value={state.username}
                      onKeyPress={e => e.key === 'Enter' && state.username && signIn()}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      'no-border input-lg' +
                      (lastFocus ? ' input-group-focus' : '')
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
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      type={passwordType}
                      onChange={onChange}
                      onKeyPress={e => e.key === 'Enter' && state.password && signIn()}
                      name='password'
                      style={{ fontSize: 'large' }}
                      value={state.password}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className='text-center'>
                  <Button
                    disabled={!state.password || !state.username}
                    block
                    className='btn-round'
                    color='info'
                    onClick={signIn}
                    size='lg'
                  >Get Started</Button>
                  <div className='pull-left'>
                    <h6
                      onClick={() => changeRoute('/register')}
                    >Create Account
                    </h6>
                  </div>
                  <div className='pull-right'>
                    <h6
                      onClick={onForgotPassword}
                    >Forgot Password?
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

const mapDisppatchToProps = {
  login: authActions.login
}

LoginPage.propTypes = {
  login: propTypes.func
}

export default connect(mapStateToProps, mapDisppatchToProps)(LoginPage)
