import gql from 'graphql-tag'

const get_dropdown_data = gql`
query($skip:Int!, $take:Int!, $filter:filterInput, $sort:sortInput){
  master_rooms(skip:$skip, take:$take, filter:$filter, sort:$sort){
      total
      data{
        id
        room_name
      }
  }
}
`
export default {
  get_dropdown_data
}