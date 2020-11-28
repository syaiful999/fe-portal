import propTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import './style.css'
import News from './sub-component/video-list'
import { videoStreamingActions } from '../../redux/actions'
import Videos from './sub-component/videos-card'
import moment from 'moment'
import Spinner from '../../components/spinner'

const ComponentSwitcher = ({ dataItem }) => {
  if (dataItem)
    return (
      <Fragment>
        <div style={{ marginTop: 100 }} className='video-documentary-container'>
          <Row className='video-streaming-sub-root'>
            <Col md='8' style={{ paddingLeft: 0 }}>
              <Videos />
            </Col>
            <Col md='4' style={{ padding: 0 }}>
              <News />
            </Col>
          </Row>
        </div>
      </Fragment>
    )
}

const Dashboard = ({
  dataItem,
  loading,
  loadingHighlight,
  dataHighlight,
}) => {
  const [timer, setTimer] = useState(moment().locale('id').format('h:mm:ss a'))
  useEffect(() => {
    if (loading) {
      setTimer(moment().locale('id').format('h:mm:ss a'))
      // getData({ dataStates })
      // getDataHighlight({ dataStates })
    }
  }, [loading, loadingHighlight])

  return (
    <Fragment>
      <Spinner loading={loading} />
      <ComponentSwitcher
        dataItem={dataItem}
        timer={timer}
        loading={loading}
        dataHighlight={dataHighlight}
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  ...state.videoStreamingReducer,
})

const mapDisppatchToProps = {
  getData: videoStreamingActions.getData,
  getDataHighlight: videoStreamingActions.getDataHighlight,
}

Dashboard.propTypes = {
  dataStates: propTypes.object,
  dataItem: propTypes.object,
  dataHighlight: propTypes.object,
  getData: propTypes.func,
  loading: propTypes.bool,
  getDetail: propTypes.func,
  discard: propTypes.func,
  getDataHighlight: propTypes.func,
  loadingHighlight: propTypes.bool,
  dataGrid: propTypes.array,
}

ComponentSwitcher.propTypes = {
  dataStates: propTypes.object,
  dataItem: propTypes.object,
  getData: propTypes.func,
  loading: propTypes.bool,
  getDetail: propTypes.func,
}

export default connect(mapStateToProps, mapDisppatchToProps)(Dashboard)
