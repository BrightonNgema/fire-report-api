const { gql } = require("apollo-server");

module.exports = typeDefs = `
####################### Inputs ##############################
input GeoInput{
  lat:String
  lng:String
}

input AddressInput {
  fulladdress: String
  geo: GeoInput
}

input ReportInput {
  _id: ID
  cellnumber: String
  ipAddress:String
  address:AddressInput
  createdDate:String
}
####################### Types ##############################
type Gecoords{
  lat:String
  lng:String
}
type Address {
  fulladdress:String
  geo:Gecoords
}

type Report {
  _id: ID
  cellnumber: String
  ipAddress:String
  address:Address
  level:String
  status:String
  createdDate:String
}


####################### Queries ##############################
  # The "Query" type is the root of all GraphQL queries.

    type Query {
        reports:[Report]
    }


####################### Mutations ##############################
  # (A "Mutation" type will be covered later on.)
    type Mutation {
        addReport(input:ReportInput) : Report
    }

`;
