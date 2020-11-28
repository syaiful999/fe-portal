import moment from 'moment'
import { isEmpty } from './is-empty'

export const filterGenerator = (filter) => {
  const valueGenerator = (value, type) => {
    if (type) return value.toString()
    if (value instanceof Date) {
      return moment(value).format()
    }
    return value.toString()
  }
  if (isEmpty(filter)) return undefined
  return {
    logic: filter.logic.toUpperCase(),
    filters: filter.filters.map((item) => ({
      ...item,
      type: typeGenerator(item.value, item.type),
      value: valueGenerator(item.value, item.type),
    })),
  }
}
export const sortGenerator = (sort) => {
  if (sort.length === 0) return undefined
  const [dataSort] = sort
  return {
    ...dataSort,
    dir: dataSort.dir.toUpperCase(),
  }
}
const typeGenerator = (val, type) => {
  if (type) return type
  switch (typeof val) {
    case 'number':
      return 'numeric'
    case 'string':
      return 'string'
    case 'boolean':
      return 'boolean'
    case 'object': {
      if (val instanceof Date) return 'date'
      else return ''
    }
    default:
      return ''
  }
}
