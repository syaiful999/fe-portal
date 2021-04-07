import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import headerPicture from '../../../assets/img/foto2.jpg'
import picture1 from '../../../assets/img/bg8.jpg'
import picture2 from '../../../assets/img/foto4.jpg'
import picture3 from '../../../assets/img/foto5.jpg'
import picture4 from '../../../assets/img/foto6.jpg'
import picture5 from '../../../assets/img/foto7.jpg'

const LandingPageHeader = ({ dataHighlight }) => {
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  const [nav3, setNav3] = useState()
  // React.useEffect(() => {
  //   if (window.innerWidth > 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3
  //       pageHeader.current.style.transform =
  //         'translate3d(0,' + windowScrollTop + 'px,0)'
  //     }
  //     window.addEventListener('scroll', updateScroll)
  //     return function cleanup() {
  //       window.removeEventListener('scroll', updateScroll)
  //     }
  //   }
  // })
  const settings1 = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'ease-out'
  }
  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: dataHighlight.length>4?4:1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
    cssEase: 'linear'
  }
  const settings3 = {
    dots: false,
    vertical: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  let data = []
  for (let index = 0; index < dataHighlight.length; index++) {
    if(index>0){
      data.push(dataHighlight[index])
    }
    if(data.length==dataHighlight.length-1){
      data.push(dataHighlight[0])
    }
  }
  const foto = [headerPicture, picture1, picture2, picture3, picture4, picture5]
  const foto1 = [picture1, picture2, picture3, picture4, picture5, headerPicture]
  // const foto2 = []
  // for (let i = 0; i < foto1.length; i++) {
  //   if(i >= foto1.length - 1) {
  //     foto1[i]=foto1[0]
  //   }else{
  //     foto1[i] = foto1[i+1]
  //   }
  //   foto2.push(foto[i])
  // }
  // console.log('foto2:',foto2)
  // console.log('foto:',foto)
  return (
    <>
      <div>
        <Slider
          asNavFor={nav3}
          ref={slider1 => (setNav1(slider1))}
          {...settings1}
        >
          {dataHighlight.map((Item) => {
            return (
              <div key={Item.id}>
                <img src={Item.file} className='landing-page-slick-1' />
              </div>
            )
          })}
        </Slider>
        <div>
          <div style={{width:dataHighlight.length>4?'1030px':'550px'}} className='landing-page-slick-2' >
            <Slider
              asNavFor={nav1}
              ref={slider2 => (setNav2(slider2))}
              {...settings2}
            >
              {data.map((item) => {
                return (
                  <div className='hero-images-container-1' key={item.id}>
                    <h6 style={{ color: 'white' }}>{item.news_title}</h6>
                    <img src={item.file} />
                  </div>
                )
              })}
            </Slider>
          </div>
          <div className='landing-page-slick-3'>
            <Slider
              asNavFor={nav2}
              ref={slider3 => (setNav3(slider3))}
              {...settings3}
            >
              {dataHighlight.map((item) => {
                return (
                  <div >
                    <div className='landing-page-slick-3-row'>
                      <small style={{ fontSize: 100 }} >{item.news_title}</small >
                      <small style={{ fontSize: 100 }} >{item.category_name}</small >
                      <small style={{ fontSize: 'small' }}>{item.news_content_format}</small>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
        <div className='landing-page-header-bottom-panel'>
          <div className='landing-page-header-bottom-panel-tab' >
            <span className='k-icon k-i-play'></span>
            <small>Video Documentary</small>
          </div>
          <div className='landing-page-header-bottom-panel-tab' >
            <span className='k-icon k-i-play'></span>
            <small>Video Documentary</small>
          </div>
          <div className='landing-page-header-bottom-panel-tab' >
            <span className='k-icon k-i-play'></span>
            <small>Video Documentary</small>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  ...state.dashboardReducer,
})

LandingPageHeader.propTypes = {
  dataHighlight: propTypes.object
}

export default connect(mapStateToProps)(LandingPageHeader)
