import gql from 'graphql-tag'

const create_media = gql`mutation createMedia(
  $media_type:String,
  $photo:String,
  $photo_name:String,
  $by:Int,
  $date:DateTime
  $size:String
){
  create_media_cms(data:{
    media_type:$media_type,
    photo:$photo,
    photo_name:$photo_name,
    is_active:true,
    created_by:$by,
    created_date:$date,
    size:$size
  }){
    id
  }
}`
const delete_media = gql`mutation deleteMedia($id:Int!){
  update_media_cms(id:$id, data:{
    is_active:false
  }){
    id
  }
}`
const update_media_cms = gql`mutation updateMedia(
  $id:Int!,
  $media_type:String,
  $photo:String,
  $photo_name:String,
  $by:Int,
  $date:DateTime
  $size:String
){
  update_media_cms(id:$id, data:{
    media_type:$media_type,
    photo:$photo,
    photo_name:$photo_name,
    is_active:true,
    created_by:$by,
    created_date:$date,
    size:$size
  }){
    id
  }
}`
export default {
  create_media,
  delete_media,
  update_media_cms
}