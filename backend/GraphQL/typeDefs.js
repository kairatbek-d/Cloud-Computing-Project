const { ApolloServer, gql } = require('apollo-server-express')
module.exports = gql`
type Post {
    id: ID!
    title: String!
    author: String!
    ISNB: String!
    genres: String!
    url: String!
    createdAt: String!
    username: String!
    PickUPAddress:String!
    isAvailable:Boolean!
    idnum:String
}
type Profile {
    id:ID!
    username:String!
    email:String!
    phone: String
    Address: String
    education: String
    profession: String
    created_at: String
    points:Int
}
input UserInput{
    phone: String
    Address: String
    education: String
    profession: String
}
type User {
    username: String!
    email: String!
    password: String!
    token: String!
}

input RegisterInput {
    username: String!
    email: String!
    password: String!
    reEnterPassword: String!
}

input LoginInput {
    username:String!
    email: String!
    password: String!
}
type Purchase{
    idnum:String,
    PickUPAddress:String,
    username:String,
}
type Query {
    user(id: ID!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getProfiles: [Profile]
    getProfile(user_id: ID!): Profile
    getPurchase: Purchase
}
type Mutation{
    registerUser(registerInput : RegisterInput): User
    loginUser(loginInput : LoginInput): User
    createPost(ISNB:String!,title:String!,author:String!,genres:String!,url: String!,PickUPAddress:String!): Post
    updatePost(idnum:String,isAvailable:Boolean!):Post
    deletePost(postId: ID!): String!
    createProfile(userInput:UserInput): Profile
    deactivateProfile(user_id: ID!): String!
    createPurchase(idnum: String,PickUPAddress:String): Purchase
    deletePurchase(purchaseId: String): String!
    updatePoints(username:String!,points:Int!): Profile
    
}
`;
