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
import background from '../../assets/img/background2.jpg'

const ComponentSwitcher = ({ dataItem }) => {
  if (dataItem)
    return (
      <div className='video-streaming-sub-root'>
        <Row >
          <Col md='8' >
            <Videos />
          </Col>
          <Col md='3' >
            <News />
          </Col>
        </Row>
      </div>
    )
}

const Dashboard = ({
  dataItem,
  loading,
  loadingHighlight,
  dataHighlight,
  dataStates,
  getData
}) => {
  const [timer, setTimer] = useState(moment().locale('id').format('h:mm:ss a'))
  useEffect(() => {
    if (loading) {
      setTimer(moment().locale('id').format('h:mm:ss a'))
      getData({ dataStates })
      // getDataHighlight({ dataStates })
    }
  }, [loading, loadingHighlight])

  return (
    <Fragment>
      <div style={{ backgroundImage: `url(${background})` }} className="videos-streaming-background">
        <Spinner loading={loading} />
        <ComponentSwitcher
          dataItem={dataItem}
          timer={timer}
          loading={loading}
          dataHighlight={dataHighlight}
        />
      </div>
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
