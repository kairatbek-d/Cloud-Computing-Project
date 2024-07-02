const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const profilesResolvers = require('./profiles')
const purchaseResolvers = require('./purchase')
module.exports={
    Query:{
        ...usersResolvers.Query,
        ...postsResolvers.Query,
        ...profilesResolvers.Query,
        ...purchaseResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...profilesResolvers.Mutation,
        ...purchaseResolvers.Mutation
    }
};