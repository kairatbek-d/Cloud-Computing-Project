const { AuthenticationError } = require('apollo-server');
const Profile = require('../../models/Profile');
const checkAuth = require('../../middleware/auth')
module.exports ={
    Query: {
        async getProfiles() {
            try {
                const profiles = await Profile.find();
                return profiles;
            } catch (err) {
                console.log(err.message)
            }
        },
        async getProfile(_,{ user_id }) {
            try{
                const profiles = await Profile.findById(user_id);
                if(profiles){
                    return profiles;
                }else{
                    throw new Error('profile not found')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createProfile(_, {userInput: {phone,Address,education,profession}},context) {
            const user = checkAuth(context);
            const newProfile = new Profile({
                phone,
                Address,
                education,
                profession,
                email: user.email,
                username:user.username,
                points: 0
            });
            const profiles = await newProfile.save();
            return profiles;
        },
        async updatePoints(_,{username, points}){
            const profile = await Profile.findOneAndUpdate(
                {"username": username},
                { "$inc":{points: points}},
                {"new": true} //returns new document
            );
            return profile;
        },
        async deactivateProfile(_, { user_id }) {
            const profiles = await Profile.findById(user_id);
            await profiles.delete();
            return 'Profile deleted successfully';
        }
    }
};