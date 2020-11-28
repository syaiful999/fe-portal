import gql from 'graphql-tag'

const download_files = gql`
  query($files: [FileDownload!]!) {
    download_files(files: $files) {
      file
    }
  }
`
const get_media = gql`query getMedia($skip:Int!, $take:Int!, $filter:filterInput, $sort:sortInput, $must_active:Boolean){
    media_cms(skip:$skip, take:$take, filter:$filter, sort:$sort, must_active:$must_active){
      total
      data{
        id
        photo
        media_type
        is_active
        created_by
        created_date
        photo_name
        size
      }
      
    }
  }`

export default {
  get_media,
  download_files
}