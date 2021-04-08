/* eslint-disable indent */
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import propTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Col, Row } from 'reactstrap'
import { dashboardAction } from '../../../redux/actions'
import CustomPagination from './table-pagination'
import Spinner from '../../../components/spinner'
// import coba from '../../../assets/img/bg1.jpg'
const exampleText = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'


const NewsCard = ({  loading, onDataStateChange, dataStates, dataGrid, viewMode }) => {
    return (
        <Fragment>
            <Spinner loading={loading} />

            {dataGrid.map((item) => {
                console.log(item)
                return(
                <div>
                    <Row style={{ marginTop: '20px' }}>
                        <Col md='5' style={{ padding: '0' }}>
                            <h5><Badge color='danger' style={{ fontSize:'medium',position: 'absolute', left: '0', top: '0', marginTop: '20px', marginLeft: '20px' }}>{item.category_name}</Badge></h5>
                            <img
                                style={{ height: '200px', objectFit: 'cover', maxHeight: '500px' }}
                                className='center-cropped'
                                src={item.file}
                            >
                            </img>
                        </Col>
                        <Col md='6'>
                            <div style={{marginTop:10}}>
                            <strong ><div className='text-news-title'>{item.news_title}</div></strong>
                            <small>BY <strong style={{ color: '#de3e20' }}>{item.author}  </strong><AccessTimeIcon style={{ color: '#2E9FFF' }} /> <strong>{item.created_date_format}</strong></small>
                            <div className='text' style={{ fontSize: '12px', marginTop: '5px' }}>
                                {item.news_content_format}
                            </div>
                            <Button
                                onClick={() => viewMode(item)}
                                style={{ position: 'absolute', bottom: '0' }}
                                className='landing-page-main-views-list-contens-text-button'>
                                Read more
                            </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            )    
        }
            )}
            <div style={{ margin: '40px' }}>
                <CustomPagination
                    skip={dataStates.skip}
                    take={dataStates.take}
                    total={dataStates.total}
                    onPageChange={val => {
                        const d = { ...dataStates, skip: val }
                        onDataStateChange(d)
                    }}
                    onTakeChange={val => {
                        const d = { ...dataStates, take: parseInt(val) }
                        onDataStateChange(d)
                    }}
                />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state.dashboardReducer,
})

const mapDisppatchToProps = {
    viewMode: dashboardAction.viewDetail,
    onDataStateChange: dashboardAction.onDataStateChange

}

NewsCard.propTypes = {
    dataGrid: propTypes.array,
    viewMode: propTypes.func,
    dataStates: propTypes.object,
    onDataStateChange: propTypes.func,
    loading: propTypes.bool
}
export default connect(mapStateToProps, mapDisppatchToProps)(NewsCard)