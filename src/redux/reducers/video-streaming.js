import { videoStreamingTypes } from '../types'
import { isEmpty } from '../../utils/is-empty'

const initialState = {
  dataGrid: [],
  dataHighlight:[],
  selectedAll: false,
  dataStates: {
    filterable: true,
    general_filter: '',
    role_filter: '',
    date_filter: '',
    status_filter: 'Published',
    filter: undefined,
    sort: [{ dir: 'DESC', field: 'id' }],
    total: 100,
    skip: 0,
    take: 10
  },
  loading: true,
  dataItem: {
    inEdit: false,
    inView: false,
    inHistory: false,
    inCheckout: false,
    photo: {
      file_video: {},
      selected: {},
    }
  },
  dropdownData: {
    newsCategory: [],
    newsTag: []
  },
  itemPlay:{}
}
const videoStreamingReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case videoStreamingTypes.GET_DATA: {
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
    case videoStreamingTypes.GET_DATA_HIGHLIGHT: {
      const { dataHighlight } = action.payload
      return {
        ...state,
        dataHighlight,
        loading: false,
        dataStates: {
          ...state.dataStates,
        }
      }
    }
    case videoStreamingTypes.DATAITEM_CHANGE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataGrid: state.dataGrid.map(item => ({
          ...item,
          [field]: value
        }))
      }
    }
    case videoStreamingTypes.DATASTATE_CHANGE: {
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
    case videoStreamingTypes.CHANGE_EDIT_MODE: {
      const { field, value } = action.payload
      return {
        ...state,
        dataItem: {
          ...state.dataItem,
          [field]: value
        }
      }
    }
    case videoStreamingTypes.GENERAL_FILTER_CHANGE: {
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
    case videoStreamingTypes.DATE_FILTER_CHANGE: {
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
    case videoStreamingTypes.STATUS_FILTER_CHANGE: {
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
    case videoStreamingTypes.GET_IMAGE: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataGrid: state.dataGrid.map(item => {
          if (item.id === dataItem.id) return dataItem
          return item
        })
      }
    }
    case videoStreamingTypes.TAG_FILTER_CHANGE: {
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
    case videoStreamingTypes.VIEW_MODE: {
      const { itemPlay } = action.payload
      return {
        ...state,
        itemPlay:itemPlay
      }
    }
    case videoStreamingTypes.ADD_DETAIL: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataItem,
        loading: true,
        dataStates: initialState.dataStates
      }
    }
    case videoStreamingTypes.RESET_FILTER: {
      return {
        ...state,
        loading: true,
        dataStates: initialState.dataStates,
        dataItem: initialState.dataItem,
        dropdownData: initialState.dropdownData
      }
    }
    case videoStreamingTypes.EDIT_DATA: {
      const { dataItem } = action.payload
      return {
        ...state,
        dataItem,
        loading: true
      }
    }
    case videoStreamingTypes.GET_DETAIL: {
      const { statusList } = action.payload
      return {
        ...state,
        loading: false,
        dropdownData: {
          statusList
        }
      }
    }
    case videoStreamingTypes.GET_PHOTO: {
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
    case videoStreamingTypes.GET_FIELD_USER: {
      const { master_field_user } = action.payload
      return {
        ...state,
        dropdownData: {
          ...state.dropdownData,
          master_field_user
        }
      }
    }
    case videoStreamingTypes.CLOSE_AUTOCOMPLETE: {
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
    case videoStreamingTypes.DISCARD: {
      return {
        loading: true,
        // dataItem: initialState.dataItem,
        // dataStates: initialState.dataStates
      }
    }
    case videoStreamingTypes.REMOVE_DATA: {
      return {
        ...state, loading: true
      }
    }
    default: return { ...state }

  }
}
export default videoStreamingReducer