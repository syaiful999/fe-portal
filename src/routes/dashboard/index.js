import React from 'react'
import './style.css'
// core components
import LandingPageHeader from './sub-component/LandingPageHeader'
import background from '../../assets/img/background2.jpg'
import ProfilePhoto from '../../assets/img/whoweare.jpg'
import Videos from './sub-component/videos'
import News from './sub-component/news'
import { Col, Row } from 'reactstrap'

function LandingPage() {
  React.useEffect(() => {
    document.body.classList.add('landing-page')
    document.body.classList.add('sidebar-collapse')
    document.documentElement.classList.remove('nav-open')
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    return function cleanup() {
      document.body.classList.remove('landing-page')
      document.body.classList.remove('sidebar-collapse')
    }
  }, [])
  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }} className=' landing-page-container wrapper'>
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
      </div>
    </>
  )
}

export default LandingPage
