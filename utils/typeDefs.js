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
  ipAddress:String
  address:AddressInput
  createdDate:String
}

input UserInput{
  cellnumber:String
  deviceId:String
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
  deviceId:String
  address:Address
  level:String
  status:String
  createdDate:String
}

type Token {
    token: String!
}

type User{
  cellnumber:String
  deviceId:String
}


####################### Queries ##############################
  # The "Query" type is the root of all GraphQL queries.

    type Query {
        reports:[Report]
        report(id:String):Report
        user:User
    }

####################### Mutations ##############################
  # (A "Mutation" type will be covered later on.)
    type Mutation {
        addReport(input:ReportInput) : Report
        registerUser(input:UserInput) : Token
    }

`;
