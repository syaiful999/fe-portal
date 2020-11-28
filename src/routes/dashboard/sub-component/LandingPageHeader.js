import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import headerPicture from '../../../assets/img/foto2.jpg'
import picture1 from '../../../assets/img/bg8.jpg'
import picture2 from '../../../assets/img/foto4.jpg'
import picture3 from '../../../assets/img/foto5.jpg'
import picture4 from '../../../assets/img/foto6.jpg'
import picture5 from '../../../assets/img/foto7.jpg'
function LandingPageHeader() {
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
    slidesToShow: 4,
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
          {foto.map((Item) => {
            return (
              <div key={Item}>
                <img src={Item} className='landing-page-slick-1' />
              </div>
            )
          })}
        </Slider>
        <div>
          <div className='landing-page-slick-2' >
            <Slider
              asNavFor={nav1}
              ref={slider2 => (setNav2(slider2))}
              {...settings2}
            >
              {foto1.map((item) => {
                return (
                  <div className='hero-images-container-1' key={item}>
                    <h6 style={{ color: 'white' }}>Bali</h6>
                    <img src={item}  />
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
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
            
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
              <div >
                <div className='landing-page-slick-3-row'>
                  <small style={{ fontSize: 100 }} >JAKARTA</small >
                  <small style={{ fontSize: 100 }} >INDONESIA</small >
                  <small style={{ fontSize: 'small' }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</small>
                </div>
              </div>
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

export default LandingPageHeader
