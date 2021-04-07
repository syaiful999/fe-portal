import { dashboardTypes } from '../types'
import { Queries, Mutations } from '../../graphql'
import { isEmpty } from '../../utils/is-empty'
import moment from 'moment'
import axios from 'axios'
import { SERVICE } from '../../config/config.json'

const defaultDataItem = {
  inEdit: false,
  inView: false,
  newsTitle: '',
  newsContent: '',
  isQuote: false,
  isHighlight: false,
}

const API_URL = SERVICE.PYTHON_SERVICE

const dashboardAction = {
  getData: ({ dataStates, client, dataItem }) => async dispatch => {
    try {
      const { skip, take, sort } = dataStates
      let param = {
        skip: skip,
        take: take,
        order: sort[0].field,
        dir: sort[0].dir,
        status_filter: 'Published',
      }
      if (dataItem.inCategory) {
        param = { ...param, category: dataItem.category_id }
      }
      let payload = await axios.get(API_URL + '/news?' + new URLSearchParams(param).toString())
      const dataGrid = payload.data.data.map(item => ({
        ...item,
        tag_arr: item.tags ? item.tags.split(', ') : [],
        created_date: new Date(item.created_date),
        modified_date: new Date(item.modified_date),
        created_date_format: moment(item.created_date).format('MMMM Do YYYY, h:mm'),
        news_content_format: item.news_content.replace(/<\/?[^>]+>/ig, ' '),
        toString: item.is_quote ? function () { return this.news_title + `${' '.repeat(30)}` } : function () { return '' }
      }))

      payload = { dataGrid: dataGrid, total: payload.data.total }
      downloadImage({ dataGrid: payload.dataGrid, client, dispatch })
      dispatch({ type: dashboardTypes.GET_DATA, payload })

      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getDataVideo: () => async dispatch => {
    try {
      let param = {
        skip: 0,
        take: 2,
        order: 'id',
        dir: 'DESC',
      }

      let payload = await axios.get(API_URL + '/video-streaming?' + new URLSearchParams(param).toString())
      const dataVideo = payload.data.data.map(item => ({
        ...item,
        // created_date: new Date(item.created_date),
        // modified_date: new Date(item.modified_date),
        created_date_format: moment(item.created_date).format('MMMM Do YYYY, h:mm'),
        // description: item.description ? item.description.replace(/<\/?[^>]+>/ig, ' ') : ''
      }))
      payload = { dataVideo: dataVideo }
      dispatch({ type: dashboardTypes.GET_DATA_VIDEO, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getDataHighlight: ({ client }) => async dispatch => {
    try {
      let param = {
        skip: 0,
        take: 9,
        order: 'id',
        dir: 'DESC',
        status_filter: 'Published'
      }
      let payload = await axios.get(API_URL + '/news?' + new URLSearchParams(param).toString())
      const dataGrid = payload.data.data.map(item => ({
        ...item,
        tag_arr: item.tags ? item.tags.split(', ') : [],
        created_date: new Date(item.created_date),
        modified_date: new Date(item.modified_date),
        created_date_format: moment(item.created_date).format('MMMM Do YYYY, h:mm'),
        news_content_format: item.news_content.replace(/<\/?[^>]+>/ig, ' '),
        toString: item.is_quote ? function () { return this.news_title + `${' '.repeat(30)}` } : function () { return '' }
      }))
      let dataHighlight = []
      dataGrid.map(item => {
        if (item.is_highlight)
          dataHighlight.push(item)
      })
      payload = { dataHighlight: dataHighlight, total: payload.data.total }
      dispatch({ type: dashboardTypes.GET_DATA_HIGHLIGHT, payload })
      downloadImageHighlight({ dataHighlight, client, dispatch })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getDetail: () => async dispatch => {
    try {
      let categoryList = await axios.get(API_URL + '/news-category')
      let categoryListMostUsed = await axios.get(API_URL + '/news-category?most-used=true')
      let tagList = await axios.get(API_URL + '/news-tag')
      let statusList = await axios.get(API_URL + '/news-status')
      let payload = { newsCategory: categoryList.data.data, newsTag: tagList.data.data, statusList: statusList.data.data, newsCategoryMostUsed: categoryListMostUsed.data.data }
      dispatch({ type: dashboardTypes.GET_DETAIL, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getCategory: (mostUsed) => async dispatch => {
    try {
      let categoryList
      if (mostUsed) {
        categoryList = await axios.get(API_URL + '/news-category?most-used=true')
      } else {
        categoryList = await axios.get(API_URL + '/news-category')
      }
      let payload = { newsCategoryMostUsed: categoryList.data.data }
      dispatch({ type: dashboardTypes.GET_CATEGORY, payload })
      return payload
    } catch (error) {
      console.log(error)
    }
  },
  getFoto: ({ client, dataItem }) => async (dispatch) => {
    try {
      if (dataItem.inEdit || dataItem.inView) {
        let photo = {
          first: { file: dataItem.file },
          second: {},
          third: {},
          selected: { file: dataItem.file },
        }
        const files = [
          { name: dataItem.news_image_2 },
          { name: dataItem.news_image_3 },
        ].filter((e) => !isEmpty(e.name))
        const { data } = await client.query({
          query: Queries.user.download_files,
          fetchPolicy: 'no-cache',
          variables: { files },
        })
        const [secondFile, thirdFile] = data.download_files
        if (secondFile)
          photo.second.file = 'data:image/jpg;base64,' + secondFile.file
        if (thirdFile)
          photo.third.file = 'data:image/jpg;base64,' + thirdFile.file
        const d = { ...dataItem, photo }
        dispatch({ type: dashboardTypes.GET_PHOTO, payload: { dataItem: d } })
        return
      }
      return dispatch({ type: dashboardTypes.GET_PHOTO, payload: {} })
    } catch (e) {
      return dispatch({ type: dashboardTypes.GET_PHOTO, payload: {} })
    }
  },
  onSubmitNewCategory: ({ dataItem }) => async dispatch => {
    try {

      const requestBody = {
        category_name: dataItem.new_category,
        is_active: true
      }
      await axios.post(API_URL + '/news-category', requestBody).catch((e) => { return { isError: true, message: e.toString() } })
      dispatch({ type: dashboardTypes.ADD_DETAIL, payload: { dataItem: { ...dataItem, new_category: '' } } })
      return { isError: false }
    } catch (e) {
      console.log(e)
      return { isError: true, message: e.toString() }
    }
  },
  onSubmitNewTag: ({ dataItem }) => async dispatch => {
    try {
      const requestBody = {
        tag_name: dataItem.new_tag.includes('#') ? dataItem.new_tag : '#' + dataItem.new_tag,
        is_active: true
      }
      await axios.post(API_URL + '/news-tag', requestBody).catch((e) => { return { isError: true, message: e.toString() } })
      dispatch({ type: dashboardTypes.ADD_DETAIL, payload: { dataItem: { ...dataItem, new_tag: '' } } })
      return { isError: false }
    } catch (e) {
      console.log(e)
      return { isError: true, message: e.toString() }
    }
  },
  onSubmit: ({ dataItem, statusId, client }) => async () => {
    try {
      if (!dataItem.inEdit) {
        let files = [
          dataItem.photo.first.data,
          dataItem.photo.second.data,
          dataItem.photo.third.data,
        ].filter((e) => e !== undefined)
        const { data } = await client.mutate({
          mutation: Mutations.upload_files.upload_files,
          variables: { files },
          fetchPolicy: 'no-cache',
        })
        var [first, second, third] = data.upload_files
      }
      let requestBody = {
        news_title: dataItem.news_title ? dataItem.news_title : null,
        news_content: dataItem.news_content ? dataItem.news_content : null,
        is_quote: isEmpty(dataItem.is_quote) ? false : dataItem.is_quote,
        is_highlight: isEmpty(dataItem.is_highlight) ? false : dataItem.is_highlight,
        news_category_id: isEmpty(dataItem.news_category_id) ? null : Number(dataItem.news_category_id.id),
        status_id: statusId,
        created_by: 1,
        modified_by: 1,
        created_date: dataItem.inEdit ? dataItem.created_date : moment().format(),
        modified_date: moment().format(),
        is_active: true,
        news_image: first ? first.filename : dataItem.news_image ? dataItem.news_image : '',
        news_image_2: second ? second.filename : dataItem.news_image_2 ? dataItem.news_image_2 : '',
        news_image_3: third ? third.filename : dataItem.news_image_3 ? dataItem.news_image_3 : '',
      }
      let returnId
      if (!dataItem.inEdit) {
        await axios.post(API_URL + '/news', requestBody)
          .then((res) => {
            returnId = res.data[0].id
            dataItem.news_tag.map((item) => {
              const tagBody = {
                news_id: returnId,
                tag_id: item.id
              }
              axios.post(API_URL + '/news-transact', tagBody)
            })
          })
          .catch((e) => { return { isError: true, message: e.toString() } })
        return { isError: false }
      }
      else {
        let firstImage, secondImage, thirdImage
        if (dataItem.photo.first.data) {
          const files = [dataItem.photo.first.data]
          const uploadData = await client.mutate({
            mutation: Mutations.upload_files.upload_files,
            variables: { files },
          })
          firstImage = uploadData.data.upload_files[0]
          requestBody = { ...requestBody, news_image: firstImage ? firstImage.filename : '' }
        }
        if (dataItem.photo.second.data) {
          const files = [dataItem.photo.second.data]
          const uploadData = await client.mutate({
            mutation: Mutations.upload_files.upload_files,
            variables: { files },
          })
          secondImage = uploadData.data.upload_files[0]
          requestBody = { ...requestBody, news_image_2: secondImage ? secondImage.filename : '' }
        }
        if (dataItem.photo.third.data) {
          const files = [dataItem.photo.third.data]
          const uploadData = await client.mutate({
            mutation: Mutations.upload_files.upload_files,
            variables: { files },
          })
          thirdImage = uploadData.data.upload_files[0]
          requestBody = { ...requestBody, news_image_3: thirdImage ? thirdImage.filename : '' }
        }
        if (isEmpty(firstImage)) requestBody = { ...requestBody, news_image: dataItem.news_image ? dataItem.news_image : '' }
        if (isEmpty(secondImage)) requestBody = { ...requestBody, news_image_2: dataItem.news_image_2 ? dataItem.news_image_2 : '' }
        if (isEmpty(thirdImage)) requestBody = { ...requestBody, news_image_3: dataItem.news_image_3 ? dataItem.news_image_3 : '' }

        await axios.put(API_URL + '/news?id=' + dataItem.id, requestBody)
          .then(() => {
            axios.delete(API_URL + '/news-transact?news_id=' + dataItem.id)
            dataItem.news_tag.map((item) => {
              const tagBody = {
                news_id: dataItem.id,
                tag_id: item.id
              }
              axios.post(API_URL + '/news-transact', tagBody)
            })
          })
          .catch((e) => { return { isError: true, message: e.toString() } })
        return { isError: false }
      }
    } catch (e) {
      console.log(e)
      return { isError: true, message: e.toString() }
    }
  },

  onDataStateChange: (dataStates) => (dispatch) => {
    dispatch({
      type: dashboardTypes.DATASTATE_CHANGE,
      payload: { dataStates },
    })
  },
  onChangeEditMode: ({ field, value }) => dispatch => {
    const payload = { field, value }
    dispatch({ type: dashboardTypes.CHANGE_EDIT_MODE, payload })
  },
  viewMode: ({ dataItem }) => async dispatch => {
    try {
      dataItem = {
        ...dataItem,
      }
      dispatch({ type: dashboardTypes.VIEW_MODE, payload: { dataItem } })
    } catch (e) {
      return { isError: true, message: e.toString() }
    }
  },
  viewDetail: (dataItem) => async dispatch => {
    try {
      if (dataItem) {
        const d = {
          ...dataItem,
          inView: true,
        }
        dispatch({ type: dashboardTypes.EDIT_DATA, payload: { dataItem: d } })
      }
      else {
        dispatch({ type: dashboardTypes.EDIT_DATA, payload: { dataItem: {...defaultDataItem, inView:true} } })
      }
      return { isError: false }
    } catch (e) {
      return { isError: true, message: e.toString() }
    }
  },
  remove: ({ dataItem, isMoveToTrash }) => async dispatch => {
    try {
      let requestBody
      if (isMoveToTrash) requestBody = { ...dataItem, status_id: 3 }
      else requestBody = { ...dataItem, is_active: false }
      await axios.put(API_URL + '/news?id=' + dataItem.id, requestBody)

      dispatch({ type: dashboardTypes.REMOVE_DATA })
      return { isError: false }
    } catch (e) {
      console.log(e)
      return { isError: true, message: e.toString() }
    }
  },
  onGeneralFilterChange: (value) => (dispatch) => {
    dispatch({
      type: dashboardTypes.GENERAL_FILTER_CHANGE,
      payload: { value },
    })
  },
  onDateFilterChange: (value) => (dispatch) => {
    dispatch({
      type: dashboardTypes.DATE_FILTER_CHANGE,
      payload: { value },
    })
  },
  onStatusFilterChange: (value) => (dispatch) => {
    dispatch({
      type: dashboardTypes.STATUS_FILTER_CHANGE,
      payload: { value },
    })
  },
  onTagFilterChange: (value) => (dispatch) => {
    dispatch({
      type: dashboardTypes.TAG_FILTER_CHANGE,
      payload: { value },
    })
  },
  onSearchUsername: ({ name }) => async dispatch => {
    try {
      const param = {
        name: name
      }
      let payload = await axios.get(API_URL + '/employee?' + new URLSearchParams(param).toString())
      payload = { master_field_user: payload.data.data }
      dispatch({ type: dashboardTypes.GET_FIELD_USER, payload })
      return payload
    } catch (e) {
      console.log(e)
      const payload = { master_field_user: [] }
      dispatch({ type: dashboardTypes.GET_FIELD_USER, payload })
      return payload
    }
  },
  discard: () => dispatch => dispatch({ type: dashboardTypes.EDIT_DATA, payload: { dataItem: defaultDataItem } }),
  resetFilter: () => dispatch => dispatch({ type: dashboardTypes.RESET_FILTER, payload: { dataItem: defaultDataItem } }),
  onCloseAutoComplete: ({ value }) => dispatch => dispatch({ type: dashboardTypes.CLOSE_AUTOCOMPLETE, payload: { value } }),

}

export default dashboardAction

const downloadImage = ({ dataGrid, client, dispatch }) => {
  dataGrid.forEach(async item => {
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
          const dataItem = { ...item, file: 'data:image/jpg;base64,' + fileData.file }
          const payload = { dataItem }
          dispatch({ type: dashboardTypes.GET_IMAGE, payload })
        }
      }
    } catch (e) {
      console.log(e)
    }
  })
}

const downloadImageHighlight = ({ dataHighlight, client, dispatch }) => {
  dataHighlight.forEach(async item => {
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
          const dataItem = { ...item, file: 'data:image/jpg;base64,' + fileData.file }
          const payload = { dataItem }
          dispatch({ type: dashboardTypes.GET_IMAGE_HIGHLIGHT, payload })
        }
      }
    } catch (e) {
      console.log(e)
    }
  })
}