import gql from 'graphql-tag'

const upload_files = gql`mutation($files:[Upload!]!) {
    upload_files(files:$files) {
      filename
      mimetype
      encoding
    }
  }
  `
export default { upload_files }