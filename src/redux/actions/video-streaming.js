import { videoStreamingTypes } from '../types'
import axios from 'axios'
import { SERVICE } from '../../config/config.json'
import moment from 'moment'

const API_URL = SERVICE.PYTHON_SERVICE

const postNewsAction = {
  getData: ({ dataStates }) => async dispatch => {
    try {
      const { skip, take, sort, date_filter, status_filter, general_filter } = dataStates
      let param = {
        skip: skip,
        take: take,
        order: sort[0].field,
        dir: sort[0].dir,
      }
      if (date_filter) param = { ...param, date_filter: date_filter }
      if (status_filter) param = { ...param, status_filter: status_filter }
      if (general_filter) param = { ...param, general_filter: general_filter }

      let payload = await axios.get(API_URL + '/video-streaming?' + new URLSearchParams(param).toString())
      const dataGrid = payload.data.data.map(item => ({
        ...item,
        // created_date: new Date(item.created_date),
        // modified_date: new Date(item.modified_date),
        //description: item.description?item.description.replace(/<\/?[^>]+>/ig, ' '):''
      }))
      payload = { dataGrid: dataGrid, total: payload.data.total }
      dispatch({ type: videoStreamingTypes.GET_DATA, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getDataHighlight: ({ dataStates }) => async dispatch => {
    try {
      const { skip, take, sort } = dataStates
      let param = {
        skip: skip,
        take: take,
        order: sort[0].field,
        dir: sort[0].dir,
        status_filter: 'Published'
      }
      let payload = await axios.get(API_URL + '/news?' + new URLSearchParams(param).toString())
      const dataHighlight = payload.data.data.map(item => ({
        ...item,
        tag_arr: item.tags ? item.tags.split(', ') : [],
        created_date: new Date(item.created_date),
        modified_date: new Date(item.modified_date),
        created_date_format: moment(item.created_date).format('MMMM Do YYYY, h:mm'),
        news_content_format: item.news_content.replace(/<\/?[^>]+>/ig, ' '),
        toString: item.is_quote ? function () { return this.news_title + `${' '.repeat(30)}` } : function () { return '' }
      }))
      payload = { dataHighlight: dataHighlight }
      dispatch({ type: videoStreamingTypes.GET_DATA_HIGHLIGHT, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getDetail: () => async dispatch => {
    try {
      let statusList = await axios.get(API_URL + '/video-streaming-status')
      let payload = { statusList: statusList.data.data }
      dispatch({ type: videoStreamingTypes.GET_DETAIL, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  viewMode: (item) => async dispatch => {
    try {
      const itemPlay = {
        ...item
      }
      dispatch({ type: videoStreamingTypes.VIEW_MODE, payload: { itemPlay } })
    } catch (e) {
      return { isError: true, message: e.toString() }
    }
  },

}
export default postNewsAction