/* eslint-disable indent */
import React, { Fragment, useEffect } from 'react'
import 'plyr/dist/plyr.css'
import Plyr from 'react-plyr'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { SERVICE } from '../../../config/config.json'
import moment from 'moment'

const Videos = ({ itemPlay }) => {
  const url = SERVICE['VIDEO-STREAMING'] + '?files=' + itemPlay.file_video
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Fragment>
      <div>
        <Plyr
          type='video'
          url={itemPlay.file_video ? url : ''}
          hideControls={true}
          height='50%'
          width='100%'
        />
      </div>
      <div className='text-video-card-title mt-4'>{itemPlay.title}</div>
      <div hidden={!itemPlay.created_date}>
        <small className='mr-3'>Published |</small>
        <small>{moment(itemPlay.created_date).format('dddd, DD MMMM YYYY')}</small>
        <hr></hr>
      </div>
      <div dangerouslySetInnerHTML={{ __html: itemPlay.description }} />
    </Fragment>
  )
}
const mapStateToProps = (state) => ({
  ...state.videoStreamingReducer,
})

Videos.propTypes = {
  itemPlay: propTypes.object,
}

export default connect(mapStateToProps)(Videos)
