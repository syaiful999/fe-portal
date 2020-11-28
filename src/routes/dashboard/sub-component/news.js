/* eslint-disable indent */
import React, { Fragment } from 'react'
import NewsCard from './news-card'
import { dashboardAction } from '../../../redux/actions'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

// const IMG_URL = 'https://www.jonathanbachmanphotography.com/img-get/I00004muFp75cdHk/s/900/659/wd=vf7RaETilcbgB0qZGkdyOaIVNtkVd0UmykK9MuWFTjWBIHRghH8HdJSyGuVJq2n2wGHv/I00004muFp75cdHk.jpg'

const News = () => {
    return (
        <Fragment >
            <div className='landing-page-main-views-list-title'>
                <h2><strong style={{ color:'rgb(226 0 0)' }}>Place </strong><strong>Views</strong> </h2>
                <div style={{ display: 'flow-root' }}>
                    <hr className='landing-page-main-views-list-title-line' ></hr>
                </div>
                <NewsCard />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state.dashboardReducer
})

const mapDisppatchToProps = {
    getData: dashboardAction.getData,
    onDataStateChange: dashboardAction.onDataStateChange
}

News.propTypes = {
    dataStates: propTypes.object,
    dataItem: propTypes.object,
    getData: propTypes.func,
    loading: propTypes.bool,
    getDetail: propTypes.func,
    onDataStateChange: propTypes.func,
    discard: propTypes.func,
}

export default connect(mapStateToProps, mapDisppatchToProps)(News)