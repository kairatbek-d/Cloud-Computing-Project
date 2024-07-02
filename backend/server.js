const connectDB = require('./config/db'); 
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

app.use(cors())
//connect database
connectDB();

const typeDefs = require('./GraphQL/typeDefs')
const resolvers = require('./GraphQL/Resolvers/server')

app.use('*', cors());
app.use(express.json());
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
});

app.get('/', (req, res) => {
    res.send('Hello from  the Book Exchange app');
});

app.use(express.static('public'));

const PORT = process.env.PORT || 4000;
(async function () {
    try {
        await server.start();
        server.applyMiddleware({ app, path: '/graphql'})
        app.listen(PORT, function () {
            console.log(`server started on port ${PORT}`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();