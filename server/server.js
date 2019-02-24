const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const Event = require('./models/events.js')
const User = require('./models/users.js')

const app = express();


app.use(bodyParser.json());


app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    input UserInput {
      email: String!
      password: String!
    }
    type RootQuery {
        events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`),
    rootValue: {
      events: () => {
          return Event.find()
          .populate('creator')
          .then(events =>{
            return events.map(event=>{
                return {
                    ...event._doc, 
                    _id: event._id
                }
            })
          })
          .catch(err=> {
              throw err
            })
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        })
        return event.save(
        ).then( result =>{
            console.log(result._doc)
        }).catch( err =>{
            console.log(err)
        });
    },
      createUser: args => {
        return bcrypt
            .hash(args.userInput.password, 12)
            .then(hashed =>{
                const user = new User({
                    email: args.userInput.email,
                    password:hashed 
                })
            return user.save();
            })
            .then(result =>{
                return {...result._doc, _id: result.id}
             })
            .catch(err=>{
                throw err
            })
      },
    },

    graphiql: true
  })
);

    mongoose.connect(
        `mongodb+srv://JonathanKo523:upYmpvNRCyVf4gT@jobhuntapp-lgaer.mongodb.net/events-react-dev?retryWrites=true`
    ) .then(()=>{
        console.log('applistening')
        app.listen(3100)
    }).catch(err => {
        console.log(err)
    })

