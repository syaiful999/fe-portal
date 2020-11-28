import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './style.css'
import { dashboardAction } from '../../redux/actions'
import DensusLogo from '../../assets/img/densus.png'
import PolriLogo from '../../assets/img/military-logo.png'
import axios from 'axios'
import { SERVICE } from '../../config/config.json'
import moment from 'moment'
import 'moment/locale/id'
import { Queries } from '../../graphql'
import { useApolloClient } from 'react-apollo'

const FooterComponent = ({ viewDetail, viewMode }) => {
  const client = useApolloClient()
  const API_URL = SERVICE.PYTHON_SERVICE
  const [categoryList, setCategoryList] = useState([])
  const [newsList, setNewsList] = useState([])

  const downloadImage = async (item) => {
    try {
      if (item.file_image) {
        const { data } = await client.query({
          query: Queries.user.download_files,
          fetchPolicy: 'no-cache',
          variables: {
            files: [{ name: item.file_image }]
          }
        })
        const [fileData] = data.download_files
        if (fileData) {
          return 'data:image/jpg;base64,' + fileData.file
        }
        return null
      }
    } catch (e) {
      console.log(e)
    }
  }
  const viewCategory = async (dataItem) => {
    dataItem = {
      inCategory: true,
      category_id: dataItem.id,
      category_name: dataItem.category_name
    }
    viewMode({ dataItem })
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(API_URL + '/news-category')
      .then(res => {
        setCategoryList(res.data.data)
      })
    axios.get(API_URL + '/news?skip=0&take=3&order=id&dir=desc&status_filter=Published')
      .then(async res => {
        let data = res.data.data
        data = await data.map(async item => {
          const file = await downloadImage(item)
          return {
            ...item,
            tag_arr: item.tags ? item.tags.split(', ') : [],
            file: file
          }
        })
        const oke = await Promise.all(data)
        setNewsList(oke)
      })
  }, [])
  if (newsList.length > 0 && categoryList.length > 0)
    return (
      <Fragment>
        <div className='footer-bottom' style={newsList.length > 0 && categoryList.length > 0 ? { marginTop: 200 } : { height: 0, width: 0 }}>
          <div>
            <div style={{ display: 'flex' }}>
              <img className='footer-logo mr-4' style={{ width: 60, height: 60 }} src={require('../../assets/img/dormitory.svg')} />
              <img className='footer-logo mr-4' src={PolriLogo} />
              <img className='footer-logo' style={{ marginTop: 5 }} src={DensusLogo} />
            </div>
            <p style={{ color: '#A8A8AA', marginTop: 20, fontSize: 12 }}>
              Densus 88 adalah satuan khusus Kepolisian Negara Republik Indonesia untuk penanggulangan terorisme di Indonesia. Pasukan khusus ini dilatih khusus untuk menangani segala ancaman teror, termasuk teror bom.
            </p>
          </div>
          <div style={{ marginLeft: 20 }}>
            <p style={{ color: '#F93D53' }}>BROWSE BY CATEGORY</p>
            <div className='category'>
              {
                categoryList.map((i) => (
                  <small
                    style={{ color: '#fff', marginBottom: 20, cursor: 'pointer' }}
                    key={i.id}
                    onClick={() => viewCategory(i)}>
                    {i.category_name}
                  </small>
                ))
              }
            </div>
          </div>
          <div>
            <p style={{ color: '#F93D53' }}>LATEST NEWS</p>
            {
              newsList.map((i) => (
                <div className='news' key={i.id}>
                  <img style={{ width: 150, height: 100, objectFit: 'cover', cursor: 'pointer' }} onClick={() => viewDetail(i)} src={i.file ? i.file : ''} />
                  <div>
                    <a onClick={() => viewDetail(i)}><small style={{ color: '#fff', cursor: 'pointer' }}>{i.news_title}</small></a><br />
                    <small style={{ color: '#fff' }}>{moment(i.created_date).locale('id').format('MMMM Do YYYY')}</small>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div style={{ height: 500 }} >
          {/* <hr style={{}} /> */}
        </div>
      </Fragment>
    )
  else return (<Fragment></Fragment>)
}
const mapStateToProps = () => ({

})
const mapDispatchToProps = {
  viewDetail: dashboardAction.viewDetail,
  viewMode: dashboardAction.viewMode,
}
export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
FooterComponent.propTypes = {
  viewDetail: propTypes.func,
  viewMode: propTypes.func,
}