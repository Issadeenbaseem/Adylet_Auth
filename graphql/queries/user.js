import gql from 'graphql-tag'

export  const userQuery = gql`

query{
usersPermissionsUser(id:91){
data{
  id
  attributes{
    username
    email
    PreferredCommunicationChannel
    confirmed

  }
}
}


}
`
