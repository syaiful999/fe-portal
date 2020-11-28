import gql from 'graphql-tag'

const create_portal_register = gql`mutation(
    $fullname:String
    $username:String
    $password:String
    $email:String
    $is_active:Boolean
    $created_by:Int
    $created_date:DateTime
  ){
    create_portal_register(data:{
        fullname:$fullname
        email:$email
        username:$username
        password:$password
        is_active:$is_active
        created_by:$created_by
        created_date:$created_date
        modified_by:$created_by
        modified_date:$created_date
    }){
      id
    }
  }
`

const update_master_rack = gql`mutation(
    $id:Int!
    $room_id:Int
    $rack_name:String
    $rack_no:String
    $row_no:String
    $description:String
    $floor_id:Int
    $is_active:Boolean
    $modified_date:DateTime
  ){
    update_master_rack(data:{
      room_id:$room_id
      rack_name:$rack_name
      rack_no:$rack_no
      row_no:$row_no
      description:$description
      floor_id:$floor_id
      is_active:$is_active
      modified_date:$modified_date
    }, id:$id){
      id
    }
  }
`

const remove_master_rack = gql`mutation($id:Int!) {
  update_master_rack(id:$id, data:{
    is_active:false
  }){
    id
  }
}
`

export default { create_portal_register, update_master_rack, remove_master_rack }