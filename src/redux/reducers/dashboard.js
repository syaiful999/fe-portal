import { dashboardTypes } from '../types'
import { isEmpty } from '../../utils/is-empty'

const initialState = {
  dataGrid: [],
  dataVideo:[],
  selectedAll: false,
  dataStates: {
    filterable: true,
    general_filter: '',
    role_filter: '',
    date_filter: '',
    status_filter: '',
    filter: undefined,
    sort: [{ dir: 'DESC', field: 'id' }],
    total: 100,
    skip: 0,
    take: 5
  },
  loading: false,
  loadingHighlight: true,
  dataItem: {
    inEdit: false,
    inView: false,
    inHistory: false,
    inCheckout: false,
    photo: {
      first: {},
      second: {},
      third: {},
      selected: {},
    }
  },
  dropdownData: {
    newsCategory: [],
    newsTag: [],
    newsCategoryMostUsed: []
  },
  dataHighlight: [{}]
}
const dashboardReducecer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case dashboardTypes.GET_DATA: {
      const { dataGrid, total } = action.payload

      return {
        ...state,
        dataGrid,
        loading: false,
        dataStates: {
          ...state.dataStates,
          total
        }
      }
    }
    case dashboardTypes.GET_DATA_VIDEO: {
      const { dataVideo } = action.payload
      return {
        ...state,
        dataVideo,
        loading: false
      }
    }
    case dashboardTypes.GET_DATA_HIGHLIGHT: {
      const { dataHighlight } = action.payload
      return {
        ...state,
        dataHighlight,
        loadingHighlight: false,
      }
    }
    case dashboardTypes.DATAITEM_CHANGE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataGrid: state.dataGrid.map(item => ({
          ...item,
          [field]: value
        }))
      }
    }
    case dashboardTypes.DATASTATE_CHANGE: {
      const { dataStates } = action.payload
      return {
        ...state,
        dataStates: {
          ...dataStates,
          total: state.dataStates.total,
          filterable: true,
          general_filter: ''
        },
        loading: true
      }
    }
    case dashboardTypes.CHANGE_EDIT_MODE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataItem: {
          ...state.dataItem,
          [field]: value
        }
      }
    }
    case dashboardTypes.GENERAL_FILTER_CHANGE: {
      const { value } = action.payload
      if (isEmpty(value)) {
        return {
          ...state,
          loading: true,
          dataStates: {
            ...state.dataStates,
            filterable: true,
            filter: initialState.dataStates.filter,
            general_filter: ''
          }
        }
      }
      let dataStates = {
        ...state.dataStates,
        general_filter: value,
        filterable: false,
        filter: {
          logic: 'OR',
          filters: [
            { field: 'rack_name', value: value, type: 'string', operator: 'contains' },
            { field: 'room_name', value: value, type: 'string', operator: 'contains' },
            { field: 'floor_name', value: value, type: 'string', operator: 'contains' },
            { field: 'description', value: value, type: 'string', operator: 'contains' },
          ]
        }
      }
      return {
        ...state,
        dataStates,
        loading: true
      }
    }
    case dashboardTypes.DATE_FILTER_CHANGE: {
      const { value } = action.payload
      if (isEmpty(value)) {
        return {
          ...state,
          loading: true,
          dataStates: {
            ...state.dataStates,
            filterable: true,
            filter: initialState.dataStates.filter,
            date_filter: ''
          }
        }
      }
      let dataStates = {
        ...state.dataStates,
        date_filter: value,
        filterable: false,
      }
      return {
        ...state,
        dataStates,
        loading: true
      }
    }
    case dashboardTypes.STATUS_FILTER_CHANGE: {
      const { value } = action.payload
      if (isEmpty(value)) {
        return {
          ...state,
          loading: true,
          dataStates: {
            ...state.dataStates,
            filterable: true,
            filter: initialState.dataStates.filter,
            status_filter: ''
          }
        }
      }
      let dataStates = {
        ...state.dataStates,
        status_filter: value,
        filterable: false,
      }
      return {
        ...state,
        dataStates,
        loading: true
      }
    }
    case dashboardTypes.GET_IMAGE: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataGrid: state.dataGrid.map(item => {
          if (item.id === dataItem.id) return dataItem
          return item
        })
      }
    }
    case dashboardTypes.GET_IMAGE_HIGHLIGHT: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataHighlight: state.dataHighlight.map(item => {
          if (item.id === dataItem.id) return dataItem
          return item
        })
      }
    }
    case dashboardTypes.TAG_FILTER_CHANGE: {
      const { value } = action.payload
      if (isEmpty(value)) {
        return {
          ...state,
          loading: true,
          dataStates: {
            ...state.dataStates,
            filterable: true,
            filter: initialState.dataStates.filter,
            tag_filter: ''
          }
        }
      }
      let dataStates = {
        ...state.dataStates,
        tag_filter: value,
        filterable: false,
      }
      return {
        ...state,
        dataStates,
        loading: true
      }
    }
    case dashboardTypes.VIEW_MODE: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataItem,
        dataStates: initialState.dataStates
      }
    }
    case dashboardTypes.ADD_DETAIL: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataItem,
        loading: true,
        dataStates: initialState.dataStates
      }
    }
    case dashboardTypes.RESET_FILTER: {
      return {
        ...state,
        loading: true,
        dataStates: initialState.dataStates,
        dataItem: initialState.dataItem,
        dropdownData: initialState.dropdownData
      }
    }
    case dashboardTypes.EDIT_DATA: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataItem,
        loading: true
      }
    }
    case dashboardTypes.GET_CATEGORY: {
      const { newsCategoryMostUsed } = action.payload
      return {
        ...state,
        loading: false,
        dropdownData: {
          newsCategoryMostUsed,
        }
      }
    }
    case dashboardTypes.GET_DETAIL: {
      const { newsCategory, newsTag, statusList, newsCategoryMostUsed } = action.payload
      return {
        ...state,
        loading: false,
        dropdownData: {
          newsCategory,
          newsTag,
          statusList,
          newsCategoryMostUsed
        }
      }
    }
    case dashboardTypes.GET_PHOTO: {
      const { dataItem } = action.payload
      if (dataItem) {
        return {
          ...state,
          loading: false,
          dataItem,
        }
      }
      return {
        ...state,
        loading: false,
      }
    }
    case dashboardTypes.GET_FIELD_USER: {
      const { master_field_user } = action.payload
      return {
        ...state,
        dropdownData: {
          ...state.dropdownData,
          master_field_user
        }
      }
    }
    case dashboardTypes.CLOSE_AUTOCOMPLETE: {
      const { value } = action.payload
      const dataItem = {
        ...state.dataItem,
        ...value,
        field_user_id: value.id
      }
      return {
        ...state,
        dataItem
      }
    }
    case dashboardTypes.DISCARD: {
      return {
        loading: true,
        // dataItem: initialState.dataItem,
        // dataStates: initialState.dataStates
      }
    }
    case dashboardTypes.REMOVE_DATA: {
      return {
        ...state, loading: true
      }
    }
    default: return { ...state }

  }
}
export default dashboardReducecer