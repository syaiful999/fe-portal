import React from 'react'
import { GridCell } from '@progress/kendo-react-grid'
import propTypes from 'prop-types'

import './style.css'

const defaultStatusShow = {
  remove: true,
  edit: true,
  print: false,
  moveToTrash: false
}

const ActionCell = ({ remove, edit, print, moveToTrash, show = defaultStatusShow, hidden = { canEdit: true, canDelete: true } }) => {
  return class extends GridCell {
    render() {
      const { dataItem } = this.props
      console.log(dataItem)
      return (
        <td className='k-command-cell'>
          <span
            className='k-icon k-i-pencil mr-2 button-icon'
            onClick={() => edit(dataItem)}
            hidden={!show.edit}
            style={hidden.canEdit ? { display: '' } : { display: 'none' }}
          />
          <span
            className='k-icon k-i-trash button-icon'
            onClick={() => remove(dataItem)}
            hidden={!show.remove}
            style={hidden.canDelete ? { display: '' } : { display: 'none' }}
          />
          <span
            className='k-icon k-i-print ml-2 button-icon'
            onClick={() => print(dataItem)}
            hidden={!show.print}
          />
          <span
            className='k-icon k-i-track-changes-reject-all ml-2 button-icon'
            onClick={() => moveToTrash(dataItem)}
            hidden={dataItem.status_id == 3}
          />
        </td>
      )
    }
  }
}
export default ActionCell
ActionCell.propTypes = {
  remove: propTypes.func,
  edit: propTypes.func,
  print: propTypes.func,
  show: propTypes.object,
  moveToTrash: propTypes.func,
}
