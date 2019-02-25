const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const book = require('./models/book.js')
const author = require('./models/author.js')

const app = express();


app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://JonathanKo523:upYmpvNRCyVf4gT@jobhuntapp-lgaer.mongodb.net/events-react-dev?retryWrites=true`) 

mongoose.connection.once('open',()=>{
  console.log('Mongoose reached')
})

app.use('/graphql',graphqlHttp({
    schema,
    graphiql: true
}));

app.listen(3100,()=>{
  console.log('Listening on 3100')
})


    // mongoose.connect(
    //     `mongodb+srv://JonathanKo523:upYmpvNRCyVf4gT@jobhuntapp-lgaer.mongodb.net/events-react-dev?retryWrites=true`
    // ) .then(()=>{
    //     console.log('applistening')
    //     app.listen(3100)
    // }).catch(err => {
    //     console.log(err)
    // })

