import gql from 'graphql-tag'

const get_user_by_nik = gql`
  query($nik: String!) {
    get_user_by_nik(nik: $nik) {
      data {
        field_user_type_id
        user_type
        employee_no
        name
        rank_id
        rank
        level
        dob
        email
        phone_no
        address
        user_photo_1
        user_photo_2
        is_active
        join_duration
        created_by
        created_date
        modified_by
        modified_date  
      }
    }
  }
`
const login = gql`
  query($username: String!, $password: String!) {
    loginPortal(username: $username, password: $password) {
      authenticated
      token
    }
  }
`
export default { get_user_by_nik, login }