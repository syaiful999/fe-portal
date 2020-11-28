/* eslint-disable indent */
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import propTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Badge, Breadcrumb, BreadcrumbItem } from 'reactstrap'

import Videos from './videos'
import { dashboardAction } from '../../../redux/actions'

const NewsDetail = ({ dataItem, discard }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Fragment>
            <Row >
                <Col md='8'>
                    <Breadcrumb style={{ backgroundColor: '#f8f9fa' }}>
                        <BreadcrumbItem><a style={{ cursor: 'pointer' }} href='#' onClick={discard}>Home</a></BreadcrumbItem>
                        <BreadcrumbItem className='text-breadcrumb' active>{dataItem.news_title}</BreadcrumbItem>
                    </Breadcrumb>
                    <strong><h2 className='text news-detail-title'>{dataItem.news_title}</h2></strong>
                    <small >BY <strong> {dataItem.author} </strong> <AccessTimeIcon style={{ color: '#2E9FFF' }} /> {dataItem.created_date_format}</small>
                    <img
                        style={{ height: '420px', objectFit: 'cover', padding: '2px', marginTop: '20px' }}
                        className='center-cropped'
                        src={dataItem.file}
                    >
                    </img>
                    <div dangerouslySetInnerHTML={{ __html: dataItem.news_content }} />
                    <div style={{ marginBottom: '50px' }}>
                        Tags:
                    <div style={{ display: 'flex' }}>
                            {dataItem.tag_arr.map(item => (
                                <h5 key={item.id} className='mr-3'>
                                    <Badge color='danger' >
                                        {item}
                                    </Badge>
                                </h5>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col md='4'>
                    <Videos />
                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state.dashboardReducer,
})

const mapDispatchToProps = {
    discard: dashboardAction.discard
}

NewsDetail.propTypes = {
    dataItem: propTypes.object,
    discard: propTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail)