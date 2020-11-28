import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TablePagination from '@material-ui/core/TablePagination'
import Pagination from '@material-ui/lab/Pagination'
import propTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'

import './style.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

const TablePaginationActions = ({ count, page, onChangePage, rowsPerPage, showRowsPerPage = true, SecondaryComponent }) => {
  const classes = useStyles()
  const totalRenderListPage = Math.ceil(count / rowsPerPage)
  return (
    <div className={classes.root} >
      <Pagination
        count={totalRenderListPage}
        page={page + 1}
        onChange={onChangePage}
        variant='outlined'
        shape='rounded'
        style={{ color: 'white' }}
        className='pagination'
      />
      {!showRowsPerPage && <SecondaryComponent />}
    </div>
  )
}

const CustomPagination = ({
  take,
  total,
  skip,
  onPageChange,
  onTakeChange
}) => {
  const page = parseInt(skip / take)
  return (
    <Table className='grid-paging'>
      <TableFooter>
        <TableRow style={{ backgroundColor:'transparent' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            colSpan={10}
            count={total}
            rowsPerPage={take}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            style={{ backgroundColor: 'transparent', color:'white' }}
            onChangePage={(_, val) => onPageChange((val - 1) * take)}
            onChangeRowsPerPage={e => onTakeChange(e.target.value)}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}
export default CustomPagination
CustomPagination.propTypes = {
  take: propTypes.number,
  total: propTypes.number,
  skip: propTypes.number,
  onPageChange: propTypes.func,
  onTakeChange: propTypes.func
}
TablePaginationActions.propTypes = {
  count: propTypes.number,
  page: propTypes.number,
  onChangePage: propTypes.func,
  rowsPerPage: propTypes.number,
  showRowsPerPage: propTypes.bool,
  SecondaryComponent: propTypes.any
}