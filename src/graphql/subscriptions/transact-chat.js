import gql from 'graphql-tag'
const subscribe_post_chat = gql`subscription($room_code:String!){
  subscribe_transact_chat(roomCode:$room_code){
    id
    room_code
    sender
    message
    date_sent
    is_generated
  }
}`
const subscribe_created_room = gql`subscription subscribeCreatedRoom($user_nik:String!){
  subscribe_transact_chat_room(user_nik:$user_nik) {
    id
    room_code
    room_name
    is_private
    members
    latest_sender
    latest_message
    date_sent
  }
}`
export default {
  subscribe_post_chat,
  subscribe_created_room
}