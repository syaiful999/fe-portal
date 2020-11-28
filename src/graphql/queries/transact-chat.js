import gql from 'graphql-tag'

const get_chat_room = gql`query getChatRooms($user_nik:String!){
  transact_chat_rooms(user_nik:$user_nik){
    id
    room_code
    room_name
    is_private
    latest_sender
    latest_message
    date_sent
    members
    unread_message
  }
}`
const get_chat_messages = gql`query getChatMessages($room_code:String!){
  transact_chat_messages(room_code:$room_code){
    total
    data{
      id
      room_code
      sender_user_nik
      message
      date_sent
      is_generated
    }
  }
}`
const get_user_data = gql`query($user_nik:String!){
  master_system_users(skip:0, take:1, filter:{
    logic:AND
    filters:[
      {field:"is_active", value:"true", operator:"eq", type:"boolean"}
      {field:"user_account", value:$user_nik, operator:"eq", type:"string"}
    ]
  }){
    data{
      user_account
      username
      user_photo_1
    }
  }
}`
const get_cms_user = gql`query getCMSUser($username:String){
  master_system_users(skip:0, take:100, filter:{
    logic:AND
    filters:[
      {field:"is_active", value:"true", operator:"eq", type:"boolean"}
      {field:"username", value:$username, operator:"contains", type:"string"}
    ]
  }){
    data{
      id
      username
      user_account
    }
  }
}`
const get_portal_user = gql`query getPortalUser($username:String!){
  v_portal_users(skip:0, take:100, filter:{
    logic:AND
    filters:[
      {field:"is_active", value:"true", operator:"eq", type:"boolean"}
      {field:"username", value:$username, operator:"contains", type:"string"}
    ]
  }){
    data{
      id
      name
      username
      user_account
      user_photo_1
    }
  }
}`
const get_portal_user_by_nik = gql`query getPortalUserByNIK($user_nik:String!){
  v_portal_users(skip:0, take:100, filter:{
    logic:AND
    filters:[
      {field:"is_active", value:"true", operator:"eq", type:"boolean"}
      {field:"user_account", value:$user_nik, operator:"contains", type:"string"}
    ]
  }){
    data{
      id
      name
      username
      user_account
      user_photo_1
    }
  }
}`
export default {
  get_chat_room,
  get_chat_messages,
  get_user_data,
  get_cms_user,
  get_portal_user,
  get_portal_user_by_nik
}
