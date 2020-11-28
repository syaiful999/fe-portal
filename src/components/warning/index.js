import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import propTypes from 'prop-types'

const logoRender = notificationType => {
  switch (notificationType) {
    case 'success':
      return require('../../assets/img/success-logo.svg')
    case 'error':
      return require('../../assets/img/error-logo.svg')
    default:
      return require('../../assets/img/warning-logo.svg')
  }
}
const colorRender = notificationType => {
  switch (notificationType) {
    case 'success':
      return 'green'
    case 'error':
      return 'red'
    default:
      return 'black'
  }
}
const DialogNotification = props => {
  const { onClose, children, show = false } = props
  return (
    <Dialog open={show} maxWidth='md'>
      <div style={{ padding: 10 }} className='text-right mr-2'>
        <img
          src={require('../../assets/img/close.svg')}
          alt=''
          style={{ cursor: 'pointer' }}
          width='30'
          onClick={onClose}
        />
      </div>
      <div style={{ margin: 20, marginTop: 0 }}>
        <div className='text-center'>
          <img
            src={logoRender(props.type)}
            alt=''
            style={{ marginBottom: 10 }}
            width='30%'
          />
          <br />
          <small style={{ color: colorRender(props.type) }} className='font-weight-bold mt-2'>
            {props.type.slice(0, 1).toUpperCase() + props.type.slice(1)}
          </small>
          <br />
          {children}
        </div>
      </div>
    </Dialog>
  )
}
export default DialogNotification
DialogNotification.propTypes = {
  onClose: propTypes.any,
  children: propTypes.any,
  type: propTypes.string,
  show: propTypes.bool
}
DialogNotification.defaultProps = {
  onClose: () => { },
  type: 'warning'
}