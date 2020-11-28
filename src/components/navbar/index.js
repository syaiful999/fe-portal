import React from 'react'
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from 'reactstrap'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authActions } from '../../redux/actions'
import propTypes from 'prop-types'

const NavbarComp = ({ logout, isAuth }) => {
  const onLogout = () => {
    localStorage.clear()
    logout()
  }
  const history = useHistory()
  // const location = useLocation()
  const changeRoute = (path) => {
    history.push('/')
    history.push(path)
  }
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent')
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor('')
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor('navbar-transparent')
      }
    }
    window.addEventListener('scroll', updateNavbarColor)
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor)
    }
  })
  return (
    <>
      {collapseOpen ? (
        <div
          id='bodyClick'
          onClick={() => {
            document.documentElement.classList.toggle('nav-open')
            setCollapseOpen(false)
          }}
        />
      ) : null}
      <Navbar className={'fixed-top ' + navbarColor} color='danger' expand='lg'>
        <div className='navbar-translate navbar-style'>
          <NavbarBrand
            href='https://demos.creative-tim.com/now-ui-kit-react/index?ref=nukr-examples-navbar'
            target='_blank'
            id='navbar-brand'
          >
              Now Ui Kit
          </NavbarBrand>
        </div>
        <Collapse
          className='justify-content-end'
          isOpen={collapseOpen}
          navbar
        >
          <Nav navbar>
            <NavItem>
              <NavLink onClick={() => changeRoute('/')}>
                  Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeRoute('/streaming')}>
                  Streaming
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeRoute('/streaming')}>
                  About Us
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeRoute('/streaming')}>
                  Contact Us
              </NavLink>
            </NavItem>
            <NavItem hidden={isAuth}>
              <NavLink onClick={() => changeRoute('/login')}>
                  Log In
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <UncontrolledDropdown hidden={!isAuth} className='button-dropdown'>
          <DropdownToggle
            caret
            data-toggle='dropdown'
            href='#pablo'
            id='navbarDropdown'
            tag='a'
            onClick={(e) => e.preventDefault()}
          >
            <span className='k-icon k-i-gear'>hahahha</span>
          </DropdownToggle>
          <DropdownMenu aria-labelledby='navbarDropdown'>
            <DropdownItem header tag='a'>
                Dropdown header
            </DropdownItem>
            <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Action
            </DropdownItem>
            <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Another action
            </DropdownItem>
            <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Something else here
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Separated link
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem  onClick={() => onLogout()}>
                Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
    </>
  )
}
const mapStateToProps = state => ({
  ...state.authReducer
})
const mapDispatchToProps = {
  logout: authActions.logout,

}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarComp)
NavbarComp.propTypes = {
  isAuth: propTypes.bool,
  location: propTypes.object,
  isLogoutModalShow: propTypes.bool,
  logoutModalShow: propTypes.func,
  logout: propTypes.func
}
