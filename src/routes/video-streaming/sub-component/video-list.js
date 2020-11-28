/* eslint-disable indent */
import React, { Fragment } from 'react'
import { videoStreamingActions } from '../../../redux/actions'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Row } from 'reactstrap'
import { SERVICE } from '../../../config/config.json'
import moment from 'moment'

const News = ({ dataGrid, onView }) => {
  const url = SERVICE['VIDEO-STREAMING-THUMBNAIL']
  return (
    <Fragment>
      <div>
        <div className='mb-3'>
        <h2><strong>List</strong><span style={{ color: '#F70D28' }}> Video</span></h2>
            <div style={{ display: 'flow-root' }}>
                <hr style={{ borderWidth: '5px', borderRadius: '20px', backgroundColor: '#F70D28', width: '20%', float: 'left', margin: 0 }}></hr>
                <hr style={{ borderWidth: '5px', borderRadius: '20px', backgroundColor: '#EEEEEE', margin: 0,width: '95%' }}></hr>
            </div>
        </div>
        <div className='video-list-container' body>
          {dataGrid.map((item) => {
            return (
              <Row className='mb-3' key={item.id}>
                <div className='video-list-colomn' onClick={() => onView(item)}>
                  <div key={item.id} className='video-list-colomn-left'>
                    <img
                      className='video-list-image'
                      src={url + '?files=' + item.file_video}
                    />
                  </div>
                  <div>
                    <strong>
                      <div className='text-video-list-title'>{item.title}</div>
                    </strong>
                    <div className='text-video-list-title-bottom mt-2'>
                      <small>Published</small>
                      <small>
                        {moment(item.created_date).format('dddd, DD MMMM YYYY')}
                      </small>
                    </div>
                  </div>
                </div>
              </Row>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  ...state.videoStreamingReducer,
})

const mapDisppatchToProps = {
  onView: videoStreamingActions.viewMode,
}

News.propTypes = {
  dataStates: propTypes.object,
  dataGrid: propTypes.array,
  dataItem: propTypes.object,
  getData: propTypes.func,
  loading: propTypes.bool,
  getDetail: propTypes.func,
  onDataStateChange: propTypes.func,
  discard: propTypes.func,
  onView: propTypes.func,
}

export default connect(mapStateToProps, mapDisppatchToProps)(News)
