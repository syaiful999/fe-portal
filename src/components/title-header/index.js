import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import { Card, CardBody } from 'reactstrap'

import './style.css'

const TitleHeader = ({ children, title, show = true }) => {
  return (
    <Fragment>
      <Card hidden={!show}>
        <CardBody>
          <div className='title-header-container'>
            <div className='title-header-item'>
              {children}
              <span className='font-weight-bold ml-2'>{title}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}
TitleHeader.propTypes = {
  children:propTypes.any,
  title:propTypes.string,
  show:propTypes.bool
}
export default TitleHeader