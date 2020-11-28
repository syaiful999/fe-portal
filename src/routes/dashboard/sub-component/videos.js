/* eslint-disable indent */
import React, { Fragment } from 'react'
import VideoCard from './video-card'
// const IMG_URL = 'https://www.jonathanbachmanphotography.com/img-get/I00004muFp75cdHk/s/900/659/wd=vf7RaETilcbgB0qZGkdyOaIVNtkVd0UmykK9MuWFTjWBIHRghH8HdJSyGuVJq2n2wGHv/I00004muFp75cdHk.jpg'
import { dashboardAction } from '../../../redux/actions'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
const Videos = () => {
    return (
        <Fragment>
            <div className='landing-page-main-video-list'>
                <h2>Latest<strong style={{ color: 'rgb(226 0 0)' }}> Video</strong></h2>
                <div style={{ display: 'flow-root' }}>
                    <hr className='landing-page-main-video-list-title-line'></hr>
                </div>
                <VideoCard />
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

Videos.propTypes = {
    dataVideo: propTypes.array,
    dataItem: propTypes.object,
    getData: propTypes.func,
    loading: propTypes.bool,
    getDetail: propTypes.func,
    onDataStateChange: propTypes.func,
    discard: propTypes.func,
}

export default connect(mapStateToProps, mapDisppatchToProps)(Videos)