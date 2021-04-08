import React from 'react'
import './style.css'
// core components
import LandingPageHeader from './sub-component/LandingPageHeader'
import background from '../../assets/img/background2.jpg'
import ProfilePhoto from '../../assets/img/whoweare.jpg'
import Videos from './sub-component/videos'
import News from './sub-component/news'
import { Col, Row } from 'reactstrap'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import NewsDetail from './sub-component/news-detail'
import { dashboardAction } from '../../redux/actions'
import { useApolloClient } from 'react-apollo'

const ComponentSwitcher = ({ dataItem }) => {
  if (dataItem.inView) return (<Fragment><NewsDetail /></Fragment>)

  return (
    <Fragment>
      <LandingPageHeader />
      <div className='landing-page-main-who-we-are'>
        <h3>WHO WE ARE ?</h3>
        <small>
          ringkasnya adalah teks standar yang ditempatkan
          untuk mendemostrasikan elemen grafis
          atau presentasi visual seperti font, tipografi,
          dan tata letak. Maksud penggunaan lipsum adalah agar
          pengamat tidak terlalu berkonsentrasi kepada arti harfiah per kalimat,
          melainkan lebih kepada elemen desain dari teks yang dipresentasi.
          </small>
      </div>
      <div className='landing-page-main-content'>
        <div className='landing-page-main-content-sub'>
          < div className='landing-page-main-profile'>
            <div className='landing-page-main-profile-container'>
              <div className='landing-page-main-profile-photo'>
                <img src={ProfilePhoto}></img>
              </div>
              <div className='landing-page-main-profile-text'>
                <div className='landing-page-main-profile-text-right'>
                  <small>
                    ringkasnya adalah teks standar yang ditempatkan
                    untuk mendemostrasikan elemen grafis
                    atau presentasi visual seperti font, tipografi,
                    dan tata letak. Maksud penggunaan lipsum adalah agar
                    pengamat tidak terlalu berkonsentrasi kepada arti harfiah per kalimat,
                    melainkan lebih kepada elemen desain dari teks yang dipresentasi.
                    </small>
                </div>
                <div className='landing-page-main-profile-text-box' />
              </div>
            </div>
          </div>
          {/* <div className="landing-page-main-video-list-container">
                <div className="landing-page-main-video-list-text">
                  <div className="landing-page-main-video-list-text-border" />
                  <div className="landing-page-main-video-list-text-float">
                    Our Last Video Documentary
                  </div>
                </div>
                <div className="landing-page-main-video-list-right-card">
                  <div className="landing-page-main-video-list-right-card-sub">
                  </div>
                  <div className="landing-page-main-video-list-right-card-sub">
                  </div>
                  <div className="landing-page-main-video-list-right-card-sub">
                  </div>
                </div>
              </div> */}
          <Row>
            <Col md='8' style={{ padding: '0' }}>
              <News />
            </Col>
            <Col md='4' style={{ padding: '0' }}>
              <Videos />
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}

const LandingPage = ({ dataItem, loading, getData, getVideo, dataStates,getDataHighlight }) => {
  const client = useApolloClient()
  React.useEffect(() => {
    if (loading) {
      getData({dataStates, dataItem, client}),
        getVideo(),
        getDataHighlight({client})
    }
  }, [])
  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }} className=' landing-page-container wrapper'>
        <ComponentSwitcher dataItem={dataItem} />
      </div>
    </>
  )
}


const mapStateToProps = (state) => ({
  ...state.dashboardReducer,
})

const mapDisppatchToProps = {
  getData: dashboardAction.getData,
  getVideo: dashboardAction.getDataVideo,
  getDataHighlight: dashboardAction.getDataHighlight
}

LandingPage.propTypes = {
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

export default connect(mapStateToProps, mapDisppatchToProps)(LandingPage)