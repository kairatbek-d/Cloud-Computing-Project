const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { UserInputError } = require('apollo-server');
const {
    validateRegisterInput,
    validateLoginInput
} = require('../../middleware/validator');

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password
            );
            if (!valid) {
                throw new UserInputError('Invalid user input', { errors });
                console.log("User Input error", errors)
            }

            //If any user already exists with the email id, throw error
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new UserInputError('Email is taken', {
                  errors: {
                    email: 'This email is taken'
                  }
                });
              }

            //Encypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            //Build mongoose model
            const newUser = new User({
                username: username,
                email:  email.toLowerCase(),
                password: encryptedPassword
            })
                
            //Create JWT (attach to user model)
            const token = jwt.sign(
                { user_id : User._id, email },
                "MY_SECRET", 
                {
                    expiresIn: "1hr"
                }
            );

            newUser.token = token;

            //Save user in MongoDB
            const res = await newUser.save()
            return {
                id: res.id,
                ...res._doc
            };
        
        },
        async loginUser(_, {loginInput: {username,email, password} }) {

            //Check if an user exists with the given email
            const { valid, errors } = validateLoginInput(
                email,
                password
            );
            if (!valid) {
                throw new UserInputError('Invalid login input', { errors });
                console.log("Invalid login input", errors)
            }

            const user = await User.findOne({ email });

            if (!user){
                console.log("user not found")
            }

            //Check if the entered password equals to the encypted password
            if (user && (await bcrypt.compare(password, user.password))) {
                //Create a new token
                const token = jwt.sign(
                    { user_id : User._id,username, email },
                    "MY_SECRET", 
                    {
                        expiresIn: "1hr"
                    }
                );

                //Attach token to user model
                user.token = token
                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                //If user does not exists, the throw error
                throw new ApolloError('Check your login info', 'INCORRECT_LOGIN_INFO');
            }
        }
    
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}
