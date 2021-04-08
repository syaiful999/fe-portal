/* eslint-disable indent */
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { connect } from 'react-redux'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row, Badge } from 'reactstrap'
// import coba from '../../../assets/img/bg3.jpg'
import { SERVICE } from '../../../config/config.json'
import propTypes from 'prop-types'
import { videoStreamingActions } from '../../../redux/actions'

const VideoCard = ({ dataVideo, viewMode }) => {
  const history = useHistory()
  const url = SERVICE['VIDEO-STREAMING-THUMBNAIL']
  const toVideoStreaming = (item) => {
    viewMode(item)
    history.push('/')
    history.push('/streaming')
  }
  return (
    <Fragment >
      {dataVideo.map(item => {
        return (
          <div>
            <Row style={{ marginTop: '20px' }}>
              <Col style={{ padding: '0' }}>
                <h5>
                  <Badge
                    color='danger'
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      marginTop: '20px',
                      marginLeft: '20px',
                      fontSize: 'medium'
                    }}
                  >
                    Video
            </Badge>
                </h5>
                <img
                  onClick={() => toVideoStreaming(item)}
                  style={{ cursor: 'pointer', height: '200px', objectFit: 'cover', maxHeight: '500px' }}
                  className='center-cropped'
                  src={url + '?files=' + item.file_video}
                ></img>
              </Col>
            </Row>
            <Row>
              <div className='dashboard-video-card-description'>
                <strong>
                  <h5 className='text-videos-title mt-2'>{item.title}</h5>
                </strong>

                <small>
                  BY <strong style={{ color: '#de3e20' }}>{item.author}</strong>
                  <AccessTimeIcon style={{ marginLeft:10, color: '#2E9FFF' }} />
                  <strong>{item.created_date_format}</strong>
                </small>
              </div>
            </Row>
            </div>
            )
      })}
    </Fragment>
  )
}
const mapStateToProps = (state) => ({
  ...state.dashboardReducer
})
const mapDisppatchToProps = {
  viewMode: videoStreamingActions.viewMode,
}
VideoCard.propTypes = {
  dataVideo: propTypes.array,
  viewMode: propTypes.func
}
export default connect(mapStateToProps, mapDisppatchToProps)(VideoCard)
