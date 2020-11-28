import gql from 'graphql-tag'

const create_room = gql`mutation($members:[transactRoomMember!]!, $room_name:String){
  create_room(members:$members, room_name:$room_name){
    id
    room_code
    room_name
    is_private
    members
  }
}`
const post_chat = gql`mutation postChat($room_code:String!, $sender:String!, $message:String!){
  post_chat(room_code:$room_code, sender:$sender, message:$message){
    id
    room_code
    sender
    message
    date_sent
    is_generated
  }
}`

const update_message_status = gql`mutation updateMessageStatus($user_nik:String!, $room_code:String!){
  update_message_status(user_nik:$user_nik, room_code:$room_code)
}`

const transactChatMutations = {
  create_room,
  post_chat,
  update_message_status
}
export default transactChatMutations