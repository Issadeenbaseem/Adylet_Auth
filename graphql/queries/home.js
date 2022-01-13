import gql from 'graphql-tag'

export  const homeQuery = gql`
query homeQuery{
  categories (pagination: {pageSize: 100}) {
    data {
      id,
      attributes {
        name,
        icon {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  },
  states {
    data {
      id,
      attributes {
        name,
        cities {
          data {
            id,
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`
