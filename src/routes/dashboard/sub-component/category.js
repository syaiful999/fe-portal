/* eslint-disable indent */
import propTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import NewsCard from './news-card'
import { dashboardAction } from '../../../redux/actions'
import { useApolloClient } from 'react-apollo'
import { Breadcrumb, BreadcrumbItem, Col } from 'reactstrap'

const Category = ({ getData, dataStates, dataItem, discard }) => {
    const client = useApolloClient()
    useEffect(() => {
        window.scrollTo(0, 0)
        getData({ dataStates, client, dataItem })
    }, [dataItem])
    return (
        <Fragment>
            <Col md='8'>
                <Breadcrumb style={{ backgroundColor: '#f8f9fa' }}>
                    <BreadcrumbItem><a style={{ cursor: 'pointer' }} href='#' onClick={discard}>Home</a></BreadcrumbItem>
                    <BreadcrumbItem className='text-breadcrumb' active>{dataItem.category_name}</BreadcrumbItem>
                </Breadcrumb>
                <NewsCard />
            </Col>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state.dashboardReducer,
})

const mapDisppatchToProps = {
    getData: dashboardAction.getData,
    discard: dashboardAction.discard
}

Category.propTypes = {
    discard: propTypes.func,
    dataStates: propTypes.object,
    dataItem: propTypes.object,
    getData: propTypes.func,
}

export default connect(mapStateToProps, mapDisppatchToProps)(Category)
