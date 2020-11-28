/* eslint-disable indent */
import React, { Fragment, useState, useEffect } from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { connect } from 'react-redux'
import { Col, Row, Badge, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'
import propTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/id'
import Spinner from '../../../components/spinner'
import { dashboardAction } from '../../../redux/actions'

const IMG_URL = 'https://images.dexerto.com/uploads/2020/05/30004846/attack-on-titan-season-4-release-date-trailer-more.jpg'

const Highlight = ({ viewMode, dataGrid, dataHighlight, loadingHighlight }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [timer, setTimer] = useState(moment().locale('id').format('h:mm:ss a'))

    const items = () => {
        let carouselArr = []
        try {
            for (let index = 0; index < 5; index++) {
                if (dataHighlight[index]) {
                    const obj = {
                        src: dataHighlight[index] ? dataHighlight[index].id : '0',
                        img: dataHighlight[index] ? dataHighlight[index].file : IMG_URL,
                        dataItem: dataHighlight[index],
                        altText:
                            <>
                                <a><Badge color='danger' style={{ position: 'absolute', left: '0', top: '0', marginTop: '-20px' }}>{dataHighlight[index] ? dataHighlight[index].category_name : ''}</Badge></a>
                                <strong className='text' style={{ textAlign: 'left', color: '#fff', fontSize: '23px' }}>{dataHighlight[index] ? dataHighlight[index].news_title : ''}
                                </strong>
                            </>,
                        caption: <small >BY <strong> {dataHighlight[index] ? dataHighlight[index].author : ''} </strong> <AccessTimeIcon style={{ color: '#2E9FFF' }} /> {dataHighlight[index].created_date_format}</small>
                    }
                    carouselArr.push(obj)
                }
            }
            return carouselArr
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const next = () => {
        if (animating) return
        const nextIndex = activeIndex === items().length - 1 ? 0 : activeIndex + 1
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if (animating) return
        const nextIndex = activeIndex === 0 ? items().length - 1 : activeIndex - 1
        setActiveIndex(nextIndex)
    }

    const goToIndex = (newIndex) => {
        if (animating) return
        setActiveIndex(newIndex)
    }

    const slides = items().map((item, index) => {
        return (
            <CarouselItem
                style={{ zIndex: '2' }}
                className='custom-tag'
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
            >
                <div style={{ height: '500px', objectFit: 'cover', padding: '2px', maxHeight: '500px', paddingBottom: '9px', maxWidth: '100%', cursor: 'pointer' }} className='overlay-img' onClick={() => viewMode(item.dataItem)} ></div>
                <img style={{ height: '500px', objectFit: 'cover', padding: '2px', maxHeight: '500px', paddingBottom: '9px', maxWidth: '100%' }} src={item.img} alt={item.altText} onClick={() => viewMode(item.dataItem)} />
                <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
            </CarouselItem>
        )
    })
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(moment().locale('id').format('h:mm:ss a'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <Fragment>
            <Row style={{ marginBottom: '50px' }}>
                <Col md='2' style={{ height: '50px', backgroundColor: '#de3e20', textAlign: 'center', color: '#FFF' }}>
                    <strong className='dashboard-center-div'>BREAKING NEWS</strong>
                </Col>
                <Col md='8' style={{ height: '50px', backgroundColor: 'rgb(225 225 225)', color: '#212121', padding: 0 }}>
                    <marquee style={{ marginTop: '2%' }} behavior='scroll' direction='left'>
                        {dataGrid.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0')}
                    </marquee>
                </Col>
                <Col md='2' style={{ height: '50px', backgroundColor: '#de3e20', textAlign: 'center', color: '#FFF', paddingTop: '13px' }}>
                    <strong>{timer.toUpperCase()}</strong>
                </Col>
            </Row>

            <Row>
                <Spinner loading={loadingHighlight} />
                <Col md='6' style={{ padding: '0', paddingTop: '7px', paddingRight: '7px' }}>
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                        style={{ zIndex: '2' }}
                        onClickHandler={e => console.log(e)}
                    >
                        <CarouselIndicators items={items()} style={{ zIndex: '2' }} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
                        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
                    </Carousel>
                </Col>
                <Col md='6' style={{ padding: '0' }}>
                    <Row >
                        <Col style={{ padding: '0' }} >
                            <div>
                                <h5><Badge color='danger' className='dashboard-news-category' >{dataHighlight[5] ? dataHighlight[5].category_name : ''}</Badge></h5>
                                <strong><h5 className='dashboard-news-title'>{dataHighlight[5] ? dataHighlight[5].news_title : ''}</h5></strong>
                                <div className='overlay-img' style={{ height: '286px', cursor: 'pointer' }} onClick={() => viewMode(dataHighlight[5])}></div>
                                <img
                                    style={{ height: '286px', paddingLeft: '1px' }}
                                    className='center-cropped'
                                    src={dataHighlight[5] ? dataHighlight[5].file : ''}
                                    onClick={() => viewMode(dataHighlight[5])}
                                >
                                </img>
                            </div>
                        </Col>
                    </Row>
                    <Row >
                        <Col md='6' style={{ padding: '0' }} >
                            <div>
                                <h5><Badge color='danger' className='dashboard-news-category' >{dataHighlight[6] ? dataHighlight[6].category_name : ''}</Badge></h5>
                                <strong><h5 className='dashboard-news-title'>{dataHighlight[6] ? dataHighlight[6].news_title : ''}</h5></strong>
                                <div className='overlay-img' style={{ height: '165px', width: '96%', cursor: 'pointer' }} onClick={() => viewMode(dataHighlight[6])}></div>
                                <img
                                    style={{ height: '165px', objectFit: 'cover', padding: '2px', paddingRight: '10px' }}
                                    className='center-cropped'
                                    src={dataHighlight[6] ? dataHighlight[6].file : ''}
                                    onClick={() => viewMode(dataHighlight[6])}
                                >
                                </img>
                            </div>
                        </Col>
                        <Col md='6' style={{ padding: '0' }} >
                            <div style={{ position: 'relative' }}>
                                <h5><Badge color='danger' className='dashboard-news-category' >{dataHighlight[7] ? dataHighlight[7].category_name : ''}</Badge></h5>
                                <strong><h5 className='dashboard-news-title'>{dataHighlight[7] ? dataHighlight[7].news_title : ''}</h5></strong>
                                <div className='overlay-img' style={{ height: '165px', cursor: 'pointer' }} onClick={() => viewMode(dataHighlight[7])}></div>
                                <img
                                    style={{ height: '165px', objectFit: 'cover', padding: '2px' }}
                                    className='center-cropped'
                                    src={dataHighlight[7] ? dataHighlight[7].file : ''}
                                    onClick={() => viewMode(dataHighlight[7])}
                                >
                                </img>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state.dashboardReducer,
})

const mapDispatchToProps = {
    viewMode: dashboardAction.viewDetail,
}

Highlight.propTypes = {
    viewMode: propTypes.func,
    dataGrid: propTypes.array,
    dataHighlight: propTypes.array,
    loadingHighlight: propTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlight)