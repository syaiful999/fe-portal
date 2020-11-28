import gql from 'graphql-tag'

const download_files = gql`
  query($files: [FileDownload!]!) {
    download_files(files: $files) {
      file
    }
  }
`

export default { download_files }